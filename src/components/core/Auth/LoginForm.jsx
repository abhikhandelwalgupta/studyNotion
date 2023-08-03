import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {


    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email , password , navigate));

    }

    const handleOnChange = (e) => {
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <form className='mt-6 flex w-full flex-col gap-y-4' onSubmit={handleOnSubmit}>
            <label className='w-full'>
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1'>Email Address
                <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    type='email'
                    required
                    placeholder='Enter email address'
                    name='email'
                    autoComplete='off'
                    onChange={handleOnChange}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                    }}
                    className='rounded-lg p-3  bg-richblack-800  w-full text-richblack-5   focus:outline-none'
                />
            </label>

            <label className='relative '>
                <p className='text-sm font-normal text-richblack-5 mb-1'>Password
                <sup className='text-pink-200'>*</sup>
                </p>

                <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder='Enter Password'
                    name='password'
                    autoComplete='off'
                    onChange={handleOnChange}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                    }}
                    className='relative rounded-lg p-3  bg-richblack-800  w-full text-richblack-5  focus:outline-none'
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
            <Link to="/forgot-password" className='flex justify-end' >
            <p className='text-blue-100 -mt-3  max-w-max'>Forgot password?</p>
            </Link>
            <button className='bg-yellow-50 rounded-lg p-2 font-inter mt-6 '>
                <span className='font-medium text-richblack-900  font-inter'>Sign In</span>
            </button>
        </form>
    )
}

export default LoginForm