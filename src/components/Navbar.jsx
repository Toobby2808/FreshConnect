import { useState } from "react";
import { RiLeafFill, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseClasses = `font-semibold text-base inline-block  hover:text-pri transition duration-300`;
  const activeClasses = `text-pri font-extrabold`;

  return (
    <nav className="bg-white w-full sticky left-0 top-0 shadow-md z-50">
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
        </ul>

        {/* NAV CTAS */}
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
              to={"/login"}
              className={` text-center  text-black font-semibold py-[10px] px-3 rounded-md cursor-pointer border-pri hover:text-pri  transition`}
            >
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">
              <button className=" flex items-center text-center border-2 justify-center text-white bg-pri font-semibold py-[10px] px-4 rounded-md cursor-pointer border-pri hover:bg-pri2 hover:border-pri2 hover:text-white transition">
                <span>Get Started</span>
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
