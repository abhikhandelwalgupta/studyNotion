import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import NavBar from "./components/comman/NavBar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import VerifyEmail from "./Pages/VerifyEmail";
import { ForgotPassword } from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import OpenRoute from "./components/core/Auth/OpenRoute"
import Dashboard from "./Pages/Dashboard";
import MyCourse from "./components/core/Dashboard/instructor/MyCourse";
import Cart from "./components/core/Dashboard/Student/Cart";
import PurchaseHistory from "./components/core/Dashboard/Student/PurchaseHistory";
import WishList from "./components/core/Dashboard/Student/WishList";
import EnrolledCourses from "./components/core/Dashboard/Student/EnrolledCourses";
import Index from "./components/core/Dashboard/Setting/index";
import AddCourse from "./components/core/Dashboard/instructor/AddCourse/AddCourse";
import EditCourse from "./components/core/Dashboard/instructor/EditCourse/index"
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";


function App() {
  return (
    <div className="w-screen min-h-screen  scroll-smooth	relative bg-richblack-900 flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />{" "}
            </OpenRoute>
          }
        />

        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />


        <Route element={<Dashboard />}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/my-courses" element={<MyCourse />} />
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/purchase-history" element={<PurchaseHistory />} />
          <Route path="dashboard/wishlist" element={<WishList />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="dashboard/settings" element={<Index />} />
          <Route path="dashboard/add-Course" element={<AddCourse />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          <Route path="dashboard/instructor" element={<Instructor />} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path={`/update-password/:id`} element={<UpdatePassword />} />
        <Route path={"/about"} element={<About />} />

      </Routes>
    </div >
  );
}

export default App;
