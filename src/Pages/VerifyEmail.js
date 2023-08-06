import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {BiArrowBack} from "react-icons/bi"
import {RxCountdownTimer} from "react-icons/rx"
import {sendOtp, signUp} from "../services/operations/authAPI"

const VerifyEmail = () => {

  const [otp, setOtp] = useState('');
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = (e) => {
    console.log("This is from data in email page :- "+JSON.stringify(signupData));
    e.preventDefault();


    const {
      email,
      password,
      firstName,
      lastName,  
      confirmPassword,
      accountType
    } = signupData;

    dispatch(signUp(accountType, firstName, lastName,email,password,confirmPassword,otp,navigate));
  }
  return (
    <div>
      <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center ">
        <div className='max-w-[500px] items-center text-richblack-5 p-4 lg:p-16'>
          <h1 className='font-semibold text-[1.875rem] leading-[2.375rem] '>VerifyEmail</h1>
          <p className='my-3 font-inter text-lg text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
          <form className='' onSubmit={handleOnSubmit}>
            <div className='flex gap-8 flex-col items-center  mt-8'>

              <OTPInput value={otp} onChange={setOtp} numInputs={6}
                renderInput={(props) => <input {...props} placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 " />}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />

              <button className='bg-yellow-50 w-full py-2 text-black font-bold rounded-lg' style={{ boxShadow: -"inset 0.5px -1.5px 0px 0px #0000001F " }}>Verify and Register</button>
              <div className='flex justify-between w-full -mt-6'>
                <Link to="/login">
                <p className='flex items-center gap-2'>
                <BiArrowBack /> Back To Signup
                </p>
                </Link>
                <button className='text-blue-100' onClick={()=> dispatch(sendOtp(signupData.email))} >
                <p className='flex items-center gap-2 justify-center'>
                  <RxCountdownTimer />
                  Resend it
                </p>
                </button >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail