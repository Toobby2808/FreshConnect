import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroImg from "../assets/images/home-images/hero.jpg";
import Lettuce from "../assets/images/home-images/lettuce.jpg";
import Carrot1 from "../assets/images/home-images/carrot1.jpg";
import BellPepper from "../assets/images/home-images/bell-peper.jpg";
import BlueBerries from "../assets/images/home-images/Blueberries.png";
import Tomatoes from "../assets/images/home-images/Tomatoes2.png";
import SweetCorn from "../assets/images/home-images/Maize.png";
import Banana from "../assets/images/home-images/banana.png";
import Potatoes from "../assets/images/home-images/SweetPotatoes.png";
import TomatoSeller from "../assets/images/home-images/tomato-seller.jpg";
import CornFarmer from "../assets/images/home-images/corn-farmer.jpg";
import FruitFarmer from "../assets/images/home-images/fruit-farmer.jpg";
import RootCropFarmer from "../assets/images/home-images/root-crop-farmer.jpg";
import { Sprout, Wheat } from "lucide-react";
import { RiLeafFill, RiShoppingCartFill } from "react-icons/ri";
import { FaBoxes, FaCheese } from "react-icons/fa";

const freshProducts = [
  {
    id: 1,
    name: `Fresh Tomatoes`,
    price: "2,500",
    quantity: `Kg`,
    farm: `Sarah Farm`,
    address: "Lagos",
    status: "Verified",
    image: Tomatoes,
    smallImage: TomatoSeller,
  },
  {
    id: 2,
    name: `Sweet Potatoes`,
    price: "3,500",
    quantity: `Kg`,
    farm: `Segun Farm`,
    address: "Enugu",
    status: "Verified",
    image: Potatoes,
    smallImage: RootCropFarmer,
  },
  {
    id: 3,
    name: `Sweet Corn`,
    price: "3,200",
    quantity: `Kg`,
    farm: `Harvest Gold`,
    address: "Kaduna",
    status: "Verified",
    image: SweetCorn,
    smallImage: CornFarmer,
  },
  {
    id: 4,
    name: `Ripe Bananas`,
    price: "1,500",
    quantity: `Dozen`,
    farm: `Tropical Farms`,
    address: "Cross River",
    status: "Verified",
    image: Banana,
    smallImage: FruitFarmer,
  },
];

const Home = () => {
  return (
    <>
      <Navbar />
      {/* HERO SECTION */}
      <section className="bg-light1 min-h-[550px] py-15 md:py-5">
        <div className="h-full max-w-[1200px] mx-auto  px-5 flex flex-col gap-6 md:gap-[3%] md:flex-row items-center">
          <div className="w-full text-center md:text-left md:w-[55%]  ">
            <h1 className="text-3xl  leading-tight mb-4 font-bold md:text-5xl">
              Fresh From Farms, <br />
              <span className="text-pri2"> Delivered To Your Doorstep</span>
            </h1>
            <p className=" md:text-lg mb-8">
              Empowering African agriculture through a digital network of trust
              and opportunity.
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              <Link to={"/signup"}>
                <button className="py-3 px-3 md:px-6 w-32 md:w-40 bg-pri cursor-pointer rounded-md border-2 border-pri text-white font-semibold hover:bg-pri2 hover:border-pri2">
                  Get Started
                </button>
              </Link>
              <Link to={"/about"}>
                <button className="py-3 px-3 md:px-6 w-32 md:w-40  rounded-md border-2 border-pri cursor-pointer text-pri font-semibold hover:bg-green-100 hover:border-green-100">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[43%] py-5 md:text-right ">
            <img src={HeroImg} alt="Hero Image" className="rounded-2xl" />
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-25">
        <div className="max-w-[1200px] mx-auto  px-5 ">
          <h2 className="text-center text-2xl font-bold mb-10">
            Shop by Category
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            {/* CATEGORY 1 */}
            <div className="bg-orange-100 p-7 md:p-10 flex flex-col items-center justify-center space-between rounded-xl">
              <Sprout size={32} className="text-orange-600 mb-2" />
              <h4 className="texl-lg md:text-xl font-medium">Tubers</h4>
            </div>
            {/* CATEGORY 2 */}
            <div className="bg-yellow-100 p-7 md:p-10 flex flex-col items-center justify-center space-between rounded-xl">
              <Wheat size={32} className="text-yellow-800 mb-2" />
              <h4 className="texl-lg md:text-xl font-medium">Grains</h4>
            </div>
            {/* CATEGORY 3 */}
            <div className="bg-green-100 p-7 md:p-10 flex flex-col items-center justify-center space-between rounded-xl">
              <RiLeafFill size={32} className="text-pri mb-2" />
              <h4 className="texl-lg md:text-xl font-medium">Vegetables</h4>
            </div>
            {/* CATEGORY 4 */}
            <div className="bg-red-100 p-7 md:p-10 flex flex-col items-center justify-center space-between rounded-xl">
              <span className="text-[30px]">🍎</span>
              <h4 className="texl-lg md:text-xl font-medium">Fruits</h4>
            </div>
            {/* CATEGORY 5 */}
            <div className="bg-blue-100 p-7 md:p-10 flex flex-col items-center justify-center space-between rounded-xl">
              <FaCheese size={32} className="text-blue-600" />
              <h4 className="texl-lg md:text-xl font-medium">Dairy</h4>
            </div>
            {/* CATEGORY 6 */}
            <div className="bg-purple-100 p-7 md:p-10 flex flex-col items-center justify-center space-between rounded-xl">
              <FaBoxes size={32} className="text-purple-600" />
              <h4 className="texl-lg md:text-xl font-medium">Bulk</h4>
            </div>
          </div>
        </div>
      </section>

      {/* FRESH DEALS */}
      <section className="py-25 bg-light1">
        <div className="max-w-[1200px] mx-auto  px-5 ">
          <h2 className="text-center text-2xl font-bold mb-10">
            Fresh Deals Today
          </h2>

          <div className="w-full md:w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {freshProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white text-black rounded-xl hover:shadow-md"
              >
                <div>
                  <img
                    src={product.image}
                    alt="{product.name} Image"
                    className="bg-cover rounded-t-xl "
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-[15px] font-semibold">{product.name}</h4>
                  <p className="font-semibold my-2 text-pri">
                    ₦{product.price}/{product.quantity}
                  </p>
                  <div className="flex gap-3 mb-4">
                    <img
                      src={product.smallImage}
                      alt={product.smallImage}
                      className="rounded-full w-10 border-3 border-pri"
                    />
                    <div>
                      <h4 className="text-[#333] text-sm font-medium">
                        {product.farm}
                      </h4>
                      <p className="flex gap-3 items-center text-[13px] ">
                        <span>{product.address}</span>
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-black mr-1 rounded-full"></span>
                          <span>{product.status}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <Link to={"/login"}>
                    <button className="py-2.5 font-semibold rounded-md w-full text-center text-pri border-2 border-pri cursor-pointer transition duration-300 hover:bg-pri hover:text-white">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section className="py-25">
        <div className="mx-4 md:mx-auto max-w-[1200px] rounded-2xl px-5 py-6 bg-pri text-white grid md:grid-cols-2 items-center gap-8">
          {/* LEFT SECTION */}
          <div>
            <h3 className="font-bold text-2xl mb-6">Farmer Spotlight</h3>
            <div className="flex items-center gap-6 mb-6">
              <img
                src={RootCropFarmer}
                alt=""
                className="w-18 h-18 border-3 border-white rounded-full"
              />
              <div>
                <h5 className="font-bold mb-2 text-lg">Emmanuel Okafor</h5>
                <p className="font-medium">
                  Organic Vegetable Specialist, Enugu State
                </p>
              </div>
            </div>
            <p className="text-[15px] ">
              "I've been farming organiacally for 15 years. Through FarmConnect,
              I can reach customers directly and get fair prices for my produce.
              My vegetables are grown without chemicals, harvested freshly
              daily."
            </p>

            <div className="py-6">
              <Link
                to={"/"}
                className="py-3 px-6 font-semibold text-black rounded-md cursor-pointer bg-white"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex justify-end items-center">
            <div className="w-full  grid grid-cols-2 gap-3">
              <img
                src={Lettuce}
                alt="Lettuce Image"
                className="rounded-xl w-full h-auto max-h-40"
              />
              <img
                src={Carrot1}
                alt="Carrot1 Image"
                className="rounded-xl w-full h-auto max-h-40"
              />
              <img
                src={BellPepper}
                alt="BellPepper Image"
                className="rounded-xl w-full h-auto max-h-40"
              />
              <img
                src={BlueBerries}
                alt="BlueBerries Image"
                className="rounded-xl w-full h-auto max-h-40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-25">
        <div className="max-w-[1200px] mx-auto  px-5 ">
          <h2 className="text-center text-2xl font-bold mb-10">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* COLUMN 1 */}
            <div className="flex flex-col p-5 items-center bg-red-300">
              <div className="w-full md:w-[70%] bg-yellow-300 p-4">
                <div className="bg-blue-100 mx-auto w-15 h-15 rounded-full flex items-center justify-center">
                  <RiShoppingCartFill size={24} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-center my-2">For Buyers</h4>

                {/* LIST */}
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white">
                      1
                    </span>
                    <span className="text-[15px] ">Browse fresh produce</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white">
                      2
                    </span>
                    <span className="text-[15px] ">Place your order</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white">
                      3
                    </span>
                    <span className="text-[15px] ">Track delivery</span>
                  </p>
                </div>

                {/* CTA */}
                <Link to={"/signup"}>
                  <button className="py-2 mt-3 w-full text-center font-semibold text-white rounded-md bg-blue-600 transition duration-200 hover:bg-blue-700 ">
                    Start Shopping
                  </button>
                </Link>
              </div>
            </div>
            {/* COLUMN 2 */}
            <div className="flex flex-col p-5 items-center bg-red-300">
              <div className="w-full md:w-[70%] bg-yellow-300 p-4">
                <div className="bg-green-100 mx-auto w-15 h-15 rounded-full flex items-center justify-center">
                  <RiLeafFill size={24} className="text-pri" />
                </div>
                <h4 className="font-semibold text-center my-2">For Farmers</h4>

                {/* LIST */}
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-pri text-[13px] font-bold text-white">
                      1
                    </span>
                    <span className="text-[15px] ">List your produce</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-pri text-[13px] font-bold text-white">
                      2
                    </span>
                    <span className="text-[15px] ">Receive orders</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-pri text-[13px] font-bold text-white">
                      3
                    </span>
                    <span className="text-[15px] ">Get paid instantly</span>
                  </p>
                </div>

                {/* CTA */}
                <Link to={"/signup"}>
                  <button className="py-2 mt-3 w-full text-center font-semibold text-white rounded-md bg-pri transition duration-200 hover:bg-green-700 ">
                    Sign Up as a Farmer
                  </button>
                </Link>
              </div>
            </div>
            {/* COLUMN 3 */}
            <div className="flex flex-col p-5 items-center bg-red-300">
              <div className="w-full md:w-[70%] bg-yellow-300 p-4">
                <div className="bg-orange-100 mx-auto w-15 h-15 rounded-full flex items-center justify-center">
                  <RiLeafFill size={24} className="text-orange-600" />
                </div>
                <h4 className="font-semibold text-center my-2">
                  For Delivery Partners
                </h4>

                {/* LIST */}
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-orange-600 text-[13px] font-bold text-white">
                      1
                    </span>
                    <span className="text-[15px] ">List your produce</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-orange-600 text-[13px] font-bold text-white">
                      2
                    </span>
                    <span className="text-[15px] ">Receive orders</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-4.5 h-4.5 flex items-center justify-center rounded-full bg-orange-600 text-[13px] font-bold text-white">
                      3
                    </span>
                    <span className="text-[15px] ">Get paid instantly</span>
                  </p>
                </div>

                {/* CTA */}
                <Link to={"/signup"}>
                  <button className="py-2 mt-3 w-full text-center font-semibold text-white rounded-md bg-orange-600 transition duration-200 hover:bg-orange-700 ">
                    Become a Partner
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
