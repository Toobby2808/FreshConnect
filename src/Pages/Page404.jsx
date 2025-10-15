import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="w-full max-w-2xl mx-auto h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-pri text-3xl sm:text-6xl md:text-8xl mb-4">
        Oops!
      </h1>
      <h4 className="font-bold text-black text-lg md:text-xl mb-6">
        404 - PAGE NOT FOUND
      </h4>
      <p className="mb-6 w-full md:w-[70%] mx-auto">
        The page you are loooking for might have been removed or had its name
        changed or it is temporarily unavailable.
      </p>
      <Link
        to={"/"}
        className="bg-pri text-white font-semibold transition duration-300 py-3 px-6 rounded-lg hover:bg-pri2"
      >
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default Page404;
