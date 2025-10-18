import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image from "../assets/images/man-farm.png";
import Google from "../assets/images/7123025_logo_google_g_icon.svg";
import { RiLeafFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const { email, password } = formData;

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check email verification
      if (!user.emailVerified) {
        toast.warning("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      // Fetch user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        toast.success("Login successful!");

        // Redirect based on role
        switch (userData.role) {
          case "Farmer":
            navigate("/farmer-dashboard");
            break;
          case "Buyer":
            navigate("/buyer-dashboard");
            break;
          case "Delivery Partner":
            navigate("/delivery-dashboard");
            break;
          case "Admin":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error("User data not found. Please register again.");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.emailVerified) {
        toast.warning("Please verify your email before logging in.");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        toast.success("Login successful!");
        switch (userData.role) {
          case "Farmer":
            navigate("/farmer-dashboard");
            break;
          case "Buyer":
            navigate("/buyer-dashboard");
            break;
          case "Delivery Partner":
            navigate("/delivery-dashboard");
            break;
          case "Admin":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.info("Welcome! Please complete registration.");
        navigate("/register");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.info("Please enter your email address.");
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset link has been sent to your email");
      setIsModalOpen(false);
      setResetEmail("");
    } catch (error) {
      toast.error(error.message);
    }
    setResetLoading(false);
  };
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
              Welcome Back
            </h2>
            <p className=" mb-4 text-center">Enter Login Details to Continue</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1 text-[#333] font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full text-base border border-pri py-2.5 px-3 rounded placeholder:text-[#8c8c8c] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-pri"
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
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    className="w-full text-base border border-pri py-2.5 px-3 rounded placeholder:text-[#8c8c8c] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-pri"
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
              <div className="text-right -mt-2 mb-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm font-medium text-pri hover:undeline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className=" mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-pri w-full text-center px-4 cursor-pointer py-2.5 border-2 border-pri text-white rounded-md transition font-semibold ease-in-out duration-200 hover:bg-pri2 hover:border-pri2"
                >
                  {loading ? "Logging in..." : "Login"}
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
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <img src={Google} className="w-8" alt="Google Logo" />
                  <span className="">Continue with Google</span>
                </button>
              </div>
            </div>

            <div className="text-sm flex items-center justify-center gap-1 mb-8">
              <span className="text-[#333] ">Don't have an account?</span>
              <Link to={"/signup"} className="font-semibold text-pri">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RESET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-sm">
            <h3 className="text-xl font-semibold mb-4 text-pri text-center">
              Reset Your Password
            </h3>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                value={resetEmail}
                placeholder="Enter Your Email"
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full text-base border border-pri py-2.5 px-3 rounded placeholder:text-[#8c8c8c] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-pri"
                required
              />

              <button
                type="submit"
                disabled={resetLoading}
                className="bg-pri w-full text-center px-4 cursor-pointer py-2.5 border-2 border-pri text-white rounded-md transition font-semibold ease-in-out duration-200 hover:bg-pri2 hover:border-pri2"
              >
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              className=" mt-4 text-sm w-full font-semibold text-center cursor-pointer px-4 py-2.5  transition duration-200 hover:underline "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
