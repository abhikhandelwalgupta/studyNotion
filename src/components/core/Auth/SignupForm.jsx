import React, {  useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "../../comman/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { toast } from "react-hot-toast";
import { sendOtp } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const  dispatch  = useDispatch()
  const navigate = useNavigate();
  const [fromData, setFromData] = useState({
    email : "",
    password : "",
    firstName : "",
    lastName : "",
    confirmPassword :""
  })
  const { email, password, firstName, lastName ,confirmPassword } = fromData

  const handleOnchange = (e) => {
    e.preventDefault()
    setFromData((prevData) => ({
      ...prevData,
      [e.target.name] : [e.target.value]
    }))
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()


    // if (password !== confirmPassword) {
    //   toast.error("Passwords Do Not Match")
    //   return
    // }

    const signupData  = {
      fromData,
      accountType
    }

    console.log("This is signUp from :- "+JSON.stringify(signupData));

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(fromData.email, navigate))
    //const result = apiconnector("GET" , endpoints.SIGNUP_API, fromData)
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  
  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form className="mt-6 flex w-full flex-col gap-y-4 " onSubmit={handleOnSubmit}>
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
              value={firstName}
              onChange={handleOnchange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="rounded-lg p-3  bg-richblack-700  w-full text-richblack-5   focus:outline-none"
            />
          </label>
          <label className="w-[50%]">
            <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1">
              <span>Last Name</span>
              <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter last name"
              name="lastName"
              value={lastName}
              autoComplete="off"
              onChange={handleOnchange}
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
            value={email}
            autoComplete="off"
            onChange={handleOnchange}
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
              name="password"
              autoComplete="off"
              value={password}
              onChange={handleOnchange}
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
              name="confirmPassword"
              value={confirmPassword}
              autoComplete="off"
              onChange={handleOnchange} 
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
    </div>
  );
};

export default SignupForm;
