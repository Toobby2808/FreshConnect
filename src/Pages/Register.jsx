import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image from "../assets/images/man-farm.png";
import Google from "../assets/images/7123025_logo_google_g_icon.svg";
import {
  RiLeafFill,
  RiCameraFill,
  RiEyeFill,
  RiEyeOffFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();

  // Base Form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    role: "",
    farmName: "",
    farmSize: "",
    productCategories: "",
    businessName: "",
    preferredProducts: "",
    vehicleType: "",
    deliveryArea: "",
  });
  // FILE STATE FOR OPTIONAL ID UPLOAD
  const [idFile, setIdFile] = useState(null);

  // UI STATE
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // FOR AGREE TO TERMS
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Read CLOUDINARY SETTINGS FROM ENV
  const CLOUDINARY_CLOUD_NAME =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  const CLOUDINARY_UPLOAD_PRESET =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

  //HANDLE SIMPLE CONTROLLED INPUT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // FILE INPUT CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setIdFile(file);
  };

  const uploadIdToCloudinary = async (file) => {
    if (!file) return null;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      console.warn("Cloudinary env not provided - skipping ID upload.");
      return null;
    }
    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();
      if (data?.secure_url) return data.secure_url;
      console.error("Cloudinary upload failed", data);
      return null;
    } catch (err) {
      console.error("Cloudinary upload error", err);
      return null;
    }
  };

  // Map Firebase
  const friendlyFirebaseError = (code) => {
    if (!code) return "An unknown error occured";
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already in registered. Try logging in.";
      case "auth/invalid-email":
        return "That email address looks inavalid.";
      case "auth/weak-password":
        return "Password is too weak, use at least 6 characters.";
      default:
        return code.replace("auth/", "").replace(/-/g, "");
    }
  };

  // Main Register handler (email/password)
  const handleRegister = async (e) => {
    e.preventDefault();

    // VALIDATIONS

    if (!agreeTerms) {
      toast.error("You must agree to FreshConnect Terms & Conditions.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);

    // Basic Validation
    if (!form.fullName || !form.email || !form.password || !form.role) {
      toast.error("Please fill the required fields and select a role.");
      setLoading(false);
      return;
    }

    try {
      // 1) Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );
      const user = userCredential.user;

      //2). Set displayName on Auth Profile
      await updateProfile(user, { displayName: form.fullName });

      //3). If an ID file is provided and Cloudinary configured, upload it
      let idUrl = null;
      if (idFile && (form.role === "Farmer" || form.role === "Delivery")) {
        const uploaded = await uploadIdToCloudinary(idFile);
        if (uploaded) {
          idUrl = uploaded;
          toast.success("ID Uploaded successfully.");
        } else {
          toast.info(
            "ID upload skipped or failed, you can add later from profile."
          );
        }
      }

      //4). Build Firestore User doc with role-specific fields
      const userDoc = {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email.trim(),
        phone: form.phone || "",
        location: form.location || "",
        role: form.role,
        createdAt: serverTimestamp(),
        emailVerified: user.emailVerified || false,
        verifiedFarmer: false,
        verifiedDelivery: false,
      };

      if (form.role === "Farmer") {
        userDoc.farmName = form.farmName || "";
        (userDoc.farmSize = form.farmSize || ""),
          (userDoc.productCategories = form.productCategories
            ? form.productCategories
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : []);
        if (idUrl) userDoc.idUrl = idUrl;
      } else if (form.role === "Buyer") {
        userDoc.businessName = form.businessName || "";
        userDoc.preferredProducts = form.preferredProducts
          ? form.preferredProducts
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
      } else if (form.role === "Delivery") {
        userDoc.vehicleType = form.vehicleType || "";
        userDoc.deliveryArea = form.deliveryArea || "";
        if (idUrl) userDoc.idUrl = idUrl;
      }

      //5) Write user doc to firestore
      await setDoc(doc(db, "users", user.uid), userDoc);

      //6) Send Verification email
      try {
        await sendEmailVerification(user);
        toast.success("Verification email sent. Check your inbox.");
      } catch (verErr) {
        console.error("sendEmailVerification error:", verErr);
        toast.warn(
          "Could not send verification email automatically. Please verify via email later."
        );
      }

      //7) Show success moadal (user must verify eamil)
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Registration failed:", err);
      const message = err?.code
        ? friendlyFirebaseError(err.code)
        : err?.message || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-in handler
  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      // Check if Firestore user doc exists, if not, create one
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        // Create a simple user doc from google profile
        const docData = {
          uid: user.uid,
          fullName: user.displayName || "",
          email: user.email || "",
          location: "",
          role: "Buyer",
          createdAt: serverTimestamp(),
          emailVerified: user.emailVerified || false,
          verifiedFarmer: false,
          verifiedDelievery: false,
        };
        await setDoc(userRef, docData);
      }
      if (!user.emailVerified) {
        toast.info("Please verify your email (check your inbox).");
      }

      // Redirect After Sign In
      const finalSnap = await getDoc(userRef);
      const role = finalSnap.exists() ? finalSnap.data()?.role : "buyer";
      // Normalize and navigate
      const rolePath = (role || "buyer").toLowerCase();
      if (rolePath === "farmer") {
        navigate("/farmer-dashboard");
      } else if (rolePath === "delivery") {
        navigate("/delivery-dashboard");
      } else if (rolePath === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/buyer-dashboard");
      }
    } catch (err) {
      console.error("Google sign-in failed:", err);
      toast.error("Google sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Form Reset
  /* const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      location: "",
      role: "",
      farmName: "",
      farmSize: "",
      productCategories: "",
      businessName: "",
      preferredProducts: "",
      vehicleType: "",
      deliveryArea: "",
    });
    setIdFile(null);
  }; */

  return (
    <>
      <div className="grid grid-cols 1 md:grid-cols-2 md:min-h-screen">
        {/* LEFT */}
        <div
          className="relative h-40 md:h-auto bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative w-[85%] mx-auto py-5 px-4 z-10">
            <Link to={"/"}>
              <div className="flex items-center gap-1.5 cursor-pointer">
                <RiLeafFill size={24} className="text-white" />
                <span className="text-white font-bold text-xl">
                  FreshConnect
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="py-5 px-8">
          <div className="w-full md:w-[85%] md:mx-auto">
            <h2 className="text-2xl font-bold text-center text-pri mb-2">
              Create an Account
            </h2>
            <p className=" mb-4 text-center">
              Please enter your details to get started.
            </p>

            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block mb-1 text-[#333] font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="w-full text-base border border-pri py-2.5 px-3 rounded placeholder:text-[#8c8c8c] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-pri"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-[#333] font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-[#333] font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    minLength={6}
                    className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                    required
                  />
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-4 cursor-pointer"
                  >
                    {showPassword ? (
                      <RiEyeOffFill size={18} className="text-pri" />
                    ) : (
                      <RiEyeFill size={18} className="text-pri" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[#333] font-semibold">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter Password"
                    minLength={6}
                    className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                    required
                  />
                  <div
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-4 cursor-pointer"
                  >
                    {showPassword ? (
                      <RiEyeOffFill size={18} className="text-pri" />
                    ) : (
                      <RiEyeFill size={18} className="text-pri" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[#333] font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number (optional)"
                  className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-[#333] font-semibold">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter Your Location (City, State)"
                  className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                  required
                />
              </div>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border border-pri rounded py-2.5 text-sm px-3 text-[#8c8c8c] focus:outline-none focus:ring-2 focus:ring-pri w-full"
                required
              >
                <option value="">Select Role</option>
                <option value="Farmer">Farmer</option>
                <option value="Buyer">Buyer</option>
                <option value="Delivery">Delivery Partner</option>
              </select>

              {/* ROLE-SPECIFIC FIELDS */}
              {form.role === "Farmer" && (
                <>
                  <div>
                    <label className="block mb-1 text-[#333] font-semibold">
                      Farm Name
                    </label>
                    <input
                      type="text"
                      name="farmName"
                      value={form.farmName}
                      onChange={handleChange}
                      placeholder="Enter Farm Name"
                      className="w-full text-base border border-pri placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 rounded focus:outline-none focus:ring-2 focus:ring-pri"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[#333] font-semibold">
                      Farm Size
                    </label>
                    <input
                      type="text"
                      name="farmSize"
                      value={form.farmSize}
                      onChange={handleChange}
                      placeholder="Enter Farm Size (e.g. 2 acres)"
                      className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[#333] font-semibold">
                      Product Categories
                    </label>
                    <input
                      type="text"
                      name="productCategories"
                      value={form.productCategories}
                      onChange={handleChange}
                      placeholder="Enter Product Categories (comma seperated)"
                      className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5  px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                      required
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="upload-photo"
                      className="flex items-center text-sm py-2.5 px-3 border border-pri rounded"
                    >
                      <RiCameraFill size={24} className="mr-2 text-pri" />
                      <span className="text-gray-500 text-sm">
                        Upload Id (optional, recommended)
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="mt-1 hidden"
                      id="upload-photo"
                    />
                  </div>
                </>
              )}

              {form.role === "Buyer" && (
                <>
                  <div>
                    <label className="block mb-1 text-[#333] font-semibold">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      placeholder="Enter Business Name (optional)"
                      className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[#333] font-semibold">
                      Preferred Products
                    </label>
                    <input
                      type="text"
                      name="preferredProducts"
                      value={form.preferredProducts}
                      onChange={handleChange}
                      placeholder="Enter Preferred Products (optional)"
                      className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                    />
                  </div>
                </>
              )}

              {form.role === "Delivery" && (
                <>
                  <div>
                    <label className="block mb-1 text-[#333] font-semibold">
                      Vehicle Type
                    </label>
                    <input
                      type="text"
                      name="vehicleType"
                      value={form.vehicleType}
                      onChange={handleChange}
                      placeholder="Enter Vehicle Type (Bike/Van)"
                      className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[#333] font-semibold">
                      Delivery Area
                    </label>
                    <input
                      type="text"
                      name="deliveryArea"
                      value={form.deliveryArea}
                      onChange={handleChange}
                      placeholder="Enter Primary delivery area"
                      className="border w-full text-base border-pri rounded placeholder:text-[#8c8c8c] placeholder:text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pri"
                      required
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="upload-photo"
                      className="flex items-center text-sm py-2.5 px-3 border border-pri rounded"
                    >
                      <RiCameraFill size={24} className="mr-2 text-pri" />
                      <span className="text-gray-500 text-base">
                        Upload Id (optional, recommended)
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="mt-1 hidden"
                      id="upload-photo"
                    />
                  </div>
                </>
              )}

              {/* AGREE TO TERMS FEATURE */}
              <div className="flex items-center gap-2 mt-2 mb-4">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 accent-pri text-pri focus:ring-pri"
                  required
                />
                <label htmlFor="agree" className="text-sm">
                  I agree to FreshConnect{" "}
                  <Link to="/terms" className="text-pri underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <div className=" mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-pri w-full text-center px-4 cursor-pointer py-2.5 border-2 border-pri text-white rounded-md transition font-semibold ease-in-out duration-200 hover:bg-pri2 hover:border-pri2"
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>

            <div className="my-10 flex items-center">
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="px-3 text-sm text-[#333]">OR</div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-center gap-3 mt-3">
                <button
                  className="flex items-center text-[#333] border border-pri gap-2 shadow cursor-pointer py-2.5 px-4 justify-center  w-full rounded-md transition ease-in-out font-semibold duration-200"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <img src={Google} className="w-8" alt="Google Logo" />
                  <span className="">Sign up with Google</span>
                </button>
              </div>
            </div>

            <div className="text-sm flex items-center justify-center gap-1 mb-8">
              <span className="text-[#333] ">Already have an account?</span>
              <Link to={"/login"} className="font-semibold text-pri">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center ">
            <h4 className="text-xl font-semibold text-pri">
              Registration Successful{" "}
            </h4>
            <p className="mt-3 text-sm text-[#333] ">
              A Verification email was sent to <strong>{form.email}</strong>.
              Please open the email and confirm verification berfore logging in.
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/login");
                }}
                className="bg-pri font-semibold cursor-pointer px-4 py-2.5 text-white transition duration-200 hover:bg-pri2 rounded-md"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
