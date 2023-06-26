import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import frameImg from "../../../assets/Images/frame.png"


const Template = ({ title, description1, description2, image, formType }) => {
    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center '>
            <div className='w-11/12 max-w-maxContent flex flex-col-reverse md:flex-row md:gap-y-0 md:gap-x-12 justify-between '>
                <div className='mx-auto w-11/12 max-w-[450px] md:mx-0 md:mt-0 mt-10' >
                    <h1 className='font-semibold text-[30px] text-richblack-5 font-inter'>{title}</h1>
                    <p className='text-[1.125rem] leading-[1.625rem]  mt-4'>
                        <span className='text-richblack-100'>{description1}</span><br />
                        <div className='font-edu-sa font-bold italic text-blue-100'>{description2}</div>
                    </p>

                    {formType === 'login' ? <LoginForm /> : <SignupForm />}
                </div>
                <div className='relative mx-auto w-11/12 max-w-[450px] md:mx-0 lg:mt:0 mt-16 '>
                    <img src={frameImg} alt='fram' width={558}
                        height={504}
                        loading="lazy" />
                    <img src={image} alt='' className='absolute bottom-4 right-4 z-10' width={558}
                        height={504}
                        loading="lazy" />
                </div>
            </div>
        </div>
    )
}

export default Template