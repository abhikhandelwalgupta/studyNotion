import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="mt-6 flex w-full flex-col gap-y-4 ">
      <div className="flex justify-around items-center gap-6 ">
        <label className="w-[50%]">
          <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1">
            First Name
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            required
            placeholder="Enter first name"
            name="firstName"
            autoComplete="off"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="rounded-lg p-3  bg-richblack-700  w-full text-richblack-5   focus:outline-none"
          />
        </label>
        <label className="w-[50%]">
          <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1">
            Last Name
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            required
            placeholder="Enter last name"
            name="lastName"
            autoComplete="off"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="rounded-lg p-3  bg-richblack-700  w-full text-richblack-5   focus:outline-none"
          />
        </label>
      </div>
      <label className="w-full ">
        <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1">
          Email Address
          <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="email"
          required
          placeholder="Enter email address"
          name="email"
          autoComplete="off"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="rounded-lg p-3  bg-richblack-700  w-full text-richblack-5   focus:outline-none"
        />
      </label>

      <div className="flex justify-around items-center gap-6 ">
        <label className="relative w-[50%]">
          <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1">
            Create Password
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter Password"
            name="firstName"
            autoComplete="off"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="rounded-lg p-3  bg-richblack-700  w-full text-richblack-5   focus:outline-none"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        <label className="relative w-[50%]">
          <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1">
            Confirm Password
            <sup className="text-pink-200">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Confirm Password"
            name="lastName"
            autoComplete="off"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="rounded-lg p-3  bg-richblack-700  w-full text-richblack-5   focus:outline-none"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
      </div>
      <button className="bg-yellow-50 rounded-lg p-2 font-inter mt-6 ">
        <span className="font-medium text-richblack-900  font-inter">
          Sign Up
        </span>
      </button>
    </form>
  );
};

export default SignupForm;
