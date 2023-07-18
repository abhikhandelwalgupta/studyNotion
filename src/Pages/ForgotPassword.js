import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../components/services/operations/authAPI";

export const ForgotPassword = () => {
  const [formData, setformData] = useState({
    email: "",
  });
  const [emailSent, setEmailSend] = useState(false);
  //  const loading = useSelector((state)=> state.auth)
  const dispatch = useDispatch();

  const { email } = formData;
  const handleOnChange = (e) => {
    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    console.log(email);
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSend));
  };
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {/* { loading ?(
        <div className="spinner"></div>
      ) :( */}
      <div className="max-w-[500px]  text-richblack-5 p-4 lg:p-16 flex gap-4 flex-col justify-start items-start ">
        <h1 className="font-semibold text-[1.875rem] leading-[2.375rem] ">
          {!emailSent ? "Reset your password" : "Check email"}
        </h1>

        {emailSent ? (
          <>
            <p className="text-richblack-100 font-inter">
              {`We have sent the reset email to your mail ${email}`}{" "}
            </p>
            <button
              className="mt-2 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] w-full font-medium text-richblack-900"
              onClick={handleOnSubmit}
            >
              Resend email
            </button>
            <Link to="/login">
            <p className="flex gap-2 items-center font-semibold font-inter">
                  <BiArrowBack />
                  Back To Login
                </p>
            </Link>
          </>
        ) : (
          <>
            {" "}
            <p className="text-richblack-100 font-inter">
              Have no fear. We'll email you instructions to reset your password.
              If you dont have access to your email we can try account recovery
            </p>
            <form
              className="flex w-full flex-col gap-y-4"
              onSubmit={handleOnSubmit}
            >
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address<sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleOnChange}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[6px] text-richblack-5"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
              <button className="mt-2 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Reset Password
              </button>
              <Link to="/login">
                <p className="flex gap-2 items-center font-semibold font-inter">
                  <BiArrowBack />
                  Back To Login
                </p>
              </Link>
            </form>
          </>
        )}
      </div>
      {/* )} */}
    </div>
  );
};
