import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import NavBar from "./components/comman/NavBar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import VerifyEmail from "./Pages/VerifyEmail";
import { ForgotPassword } from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";

function App() {
  return (
    <div className="w-screen min-h-screen  scroll-smooth	relative bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="forgot-password" element={<ForgotPassword/>} />
        <Route path={`/update-password/:id`} element={<UpdatePassword/>} />
        <Route path={"/about"} element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
