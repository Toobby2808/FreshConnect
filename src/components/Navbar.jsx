import { useState, useEffect, useRef } from "react";
import {
  RiLeafFill,
  RiMenuLine,
  RiCloseLine,
  RiArrowDropDownLine,
} from "react-icons/ri";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { div } from "framer-motion/client";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, profile, logout } = useAuthContext();

  // UI States
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isMarketplace = location.pathname.startsWith("/marketplace");
  if (isMarketplace) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const dashboardPath = profile
    ? profile.role === "Farmer"
      ? "/farmer-dashboard"
      : profile.role === "Buyer"
      ? "/buyer-dashboard"
      : profile.role === "Delivery"
      ? "/delivery-dashboard"
      : "/admin-dashboard"
    : "/";

  const avatarLetter = profile?.fullName
    ? profile.fullName[0].toUpperCase()
    : "U";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const baseClasses = `font-semibold text-base inline-block  hover:text-pri transition duration-300`;
  const activeClasses = `text-pri font-extrabold`;

  return (
    <nav className="bg-white w-full sticky left-0 top-0 z-50">
      <div className="h-full max-w-[1200px] mx-auto py-7 md:py-5 px-5 flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <RiLeafFill size={24} className="text-pri" />
            <span className="text-pri font-bold text-xl">FreshConnect</span>
          </div>
        </Link>

        <ul className="hidden md:flex space-x-8">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/marketplace"}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Marketplace
            </NavLink>
          </li>
        </ul>

        {/* AUTH BUTTONS / AVATAR (DESKTOP) */}
        {!currentUser ? (
          <div className="hidden md:flex md:items-center gap-2">
            <NavLink to={"/login"}>
              <button className=" text-center  text-black font-semibold py-[10px] px-3 rounded-md cursor-pointer border-pri hover:text-pri  transition">
                Log In
              </button>
            </NavLink>

            <NavLink to="/signup">
              <button className=" flex items-center text-center border-2 justify-center text-white bg-pri font-semibold py-[10px] px-4 rounded-md cursor-pointer border-pri hover:bg-pri2 hover:border-pri2 hover:text-white transition">
                <span>Get Started</span>
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="flex cursor-pointer items-center gap-2 focus:outline-none"
            >
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt=""
                  className="w-10 h-10 rounded-full border"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-pri flex items-center justify-center text-xl text-white font-semibold">
                  {avatarLetter}
                </div>
              )}
              <RiArrowDropDownLine
                size={24}
                className={`text-gray-600 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* DROPDOWN */}
            {dropdownOpen && (
              <div
                className="absolute right-0 top-12 w-40 bg-white rounded shadow-md py-2 z-30 transition-all duration-200 transform origin-top-right"
                role="menu"
              >
                <Link
                  to={dashboardPath}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm transition duration-200 hover:text-pri"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block px-4 py-2 text-sm transition duration-200 hover:text-pri"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-black cursor-pointer"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <RiCloseLine size={28} /> : <RiMenuLine size={28} />}
        </button>
      </div>

      {/* MOBILE_MENU */}
      <div
        className={`md:hidden bg-white border-t shadow-md overflow-hidden transition-all duration-300 ${
          menuOpen ? `max-h-[400px]  block` : `mx-h-0 hidden`
        }`}
      >
        <ul className="flex flex-col justify-center items-center p-4 space-y-4 text-black font-semibold">
          <li>
            <NavLink
              to={"/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `text-pri font-extrabold`
                    : `font-semibold text-base block transition hover:text-pri `
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `text-pri font-extrabold`
                    : `font-semibold text-base block transition hover:text-pri `
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `text-pri font-extrabold`
                    : `font-semibold text-base block transition hover:text-pri `
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/marketplace"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${
                  isActive
                    ? `text-pri font-extrabold`
                    : `font-semibold text-base block transition hover:text-pri `
                }`
              }
            >
              Marketplace
            </NavLink>
          </li>
        </ul>
        {/* Auth options (mobile) */}
        {!currentUser ? (
          <div>
            <Link
              to={"/login"}
              className={` text-center  text-black font-semibold py-[10px] px-3 rounded-md cursor-pointer border-pri hover:text-pri  transition`}
            >
              Log In
            </Link>

            <Link to="/signup">
              <button className=" flex items-center text-center border-2 justify-center text-white bg-pri font-semibold py-[10px] px-4 rounded-md cursor-pointer border-pri hover:bg-pri2 hover:border-pri2 hover:text-white transition">
                <span>Get Started</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2 pb-5 px-6">
            <Link
              to={dashboardPath}
              onClick={() => setMenuOpen(false)}
              className="font-semibold px-3 py-2.5 text-center transition ease-in-out duration-200 hover:text-pri"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="border-2 border-pri transition ease-in-out duration-200 hover:bg-pri hover:text-white w-[200px] mx-auto rounded-md px-3 py-2.5 text-center font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
