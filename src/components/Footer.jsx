import { Link } from "react-router-dom";
import {
  RiLeafFill,
  RiFacebookFill,
  RiTwitterXFill,
  RiInstagramFill,
  RiHome2Fill,
  RiPhoneFill,
  RiMailFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-pri text-white py-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[30%_16%_16%_30%] gap-8 ">
          {/* COLUMN 1 */}
          <div className="space-y-5">
            <Link to={"/"}>
              <div className="flex items-center gap-1.5 cursor-pointer">
                <RiLeafFill size={24} className="text-white" />
                <span className="text-white font-bold text-xl">
                  FreshConnect
                </span>
              </div>
            </Link>

            <p className="text-sm w-full md:w-[80%] mt-4">
              Connect with local Nigerian farmers directly, fresh from the farm,
              straight to your kitchen.
            </p>

            <div className="flex gap-3 mt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/30 hover:bg-white hover:text-pri transition duration-200"
              >
                <RiFacebookFill size={20} />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/30 hover:bg-white hover:text-pri transition duration-200"
              >
                <RiTwitterXFill size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/30 hover:bg-white hover:text-pri transition duration-200"
              >
                <RiInstagramFill size={20} />
              </a>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-5">
            <h3 className=" font-bold">Quick Links</h3>
            <ul className="space-y-3 text.sm">
              <li className="hover:text-white/80">
                <Link
                  to={"/"}
                  className="text-white transition ease-in-out text-sm  duration-200 hover:text-white/80 "
                >
                  Home
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/about"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  About
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/contact"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Contact
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Marketplace
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-5">
            <h3 className=" font-bold">Categories</h3>
            <ul className="space-y-3 text.sm">
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Tubers
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Grains
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Vegetables
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Fruits
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Dairy
                </Link>
              </li>
              <li className="hover:text-white/80">
                <Link
                  to={"/marketplace"}
                  className="text-white transition ease-in-out text-sm duration-200 hover:text-white/80 "
                >
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div className="space-y-5">
            <h3 className=" font-bold">Contact</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center">
                <RiHome2Fill size={18} className="mr-1" />
                23A Segun Adefolu, Ikorodu, Lagos, Nigeria
              </div>
              <div>
                <a
                  href="tel:+2347048211226"
                  className="cursor-pointer text-white hover:text-white/80 flex items center"
                >
                  <RiPhoneFill size={18} className="mr-1" />
                  +234 704 821 1226
                </a>
              </div>
              <div>
                <a
                  href="mailto:hello@freshsconnect.ng"
                  className="cursor-pointer text-white hover:text-white/80 flex items-center"
                >
                  <RiMailFill size={18} className="mr-1" />
                  hello@freshconnect.ng
                </a>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="mt-6">
              <label htmlFor="newsletter" className="font-bold">
                Newsletter
              </label>
              <form className="flex flex-col gap-2 mt-2">
                <input
                  type="email"
                  aria-label="Email Address"
                  id="newsletter"
                  placeholder="Your email"
                  className="bg-green-100 placeholder:text-sm placeholder:text-[#333] text-[#333] text-sm  px-4 py-3 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-pri"
                />
                <button
                  type="submit"
                  className="rounded-md bg-pri2 text-white font-semibold px-4 py-3 transition cursor-pointer duration-200 ease-in-out hover:bg-green-800 "
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOOM ROW */}
        <div className="border-t mt-8 border-white/50">
          <div className="pt-8 flex flex-col md:flex-row justify-between text-sm">
            <div>
              {new Date().getFullYear()} FreshConnect. All rights reserved.
            </div>
            <div className="flex gap-4 mt-3 md:mt-0">
              <Link
                to={"/terms"}
                className="text-sm text-white hover:text-white/80"
              >
                Terms
              </Link>
              <Link
                to={"/privacy"}
                className="text-sm text-white hover:text-white/80"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
