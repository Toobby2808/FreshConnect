import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Page404 from "./Pages/Page404";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ERROR PAGE */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
