import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png"
import { HightlightText } from './HightlightText'
import { CTABUTTON } from './Button'
import { BsArrowRightShort } from 'react-icons/bs'

export const Instructor = () => {
    return (
        <div className="flex items-center   flex-row gap-12">
            <div className='w-[50%] my-16 box-drop-shadow'>
                <img
                    src={InstructorImage}
                    alt=""
                    className='shadow-white'
                />
            </div>
            <div className='flex flex-col gap-4 items-start justify-start w-[50%]' >
                <div className='text-4xl font-semobold w-[50%]'>
                    Become an <br />
                    <HightlightText text={"instructor"} />
                </div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>


                <div className='w-fit font-bold mt-8'>
                    <CTABUTTON active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center'>
                            Start Learning Today
                            <BsArrowRightShort />
                        </div>
                    </CTABUTTON>
                </div>
            </div>
        </div>
    )
}
