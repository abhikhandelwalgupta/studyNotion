import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updatePassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setformData] = useState({
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const { password, confirmPassword, oldPassword } = formData;
  const dispatch = useDispatch()
  const params = useParams();
  const token = params.id;
  const handleOnChange = (e) => {
    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(`ddd ${JSON.stringify(formData)} ,params  ${token}`);
    dispatch(updatePassword(oldPassword,password , confirmPassword , token))
    
  };
  return (
    <div className="min-h-[calc(100vh-4.5rem)] grid place-items-center text-white">
      <div className="max-w-[500px] flex items-start  justify-start flex-col gap-y-4  px-6 md:px-2 lg:px-0">
        <h1 className="font-inter text-richblack-5 text-3xl font-semibold">
          Choose new password
        </h1>
        <p className="text-richblack-100 text-lg font-normal">
          Almost done. Enter new Password and you're all set
        </p>
        <form
          className="flex w-full flex-col gap-y-4"
          onSubmit={handleOnSubmit}
        >
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Old Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showOldPassword ? "text" : "password"}
              required
              autoComplete="off"
              placeholder="Enter Old Password"
              name="oldPassword"
              onChange={handleOnChange}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[6px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[32px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="off"
              placeholder="Enter Password"
              name="password"
              onChange={handleOnChange}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[6px] text-richblack-5"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[32px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              autoComplete="off"
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <button className="mt-2 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" onSubmit={handleOnSubmit}>Reset Password</button>
          <Link to="/login">
                <p className="flex gap-2 items-center font-semibold font-inter">
                  <BiArrowBack />
                  Back To Login
                </p>
              </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
