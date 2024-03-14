import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png"
import { HightlightText } from './HightlightText'
import { CTABUTTON } from './Button'
import { BsArrowRightShort } from 'react-icons/bs'

export const Instructor = () => {
    return (
        <div className="flex items-center   flex-row gap-12  xs:flex-col xs:gap-0">
            <div className='w-[50%] my-16 box-drop-shadow xs:w-[90%] '>
                <img
                    src={InstructorImage}
                    alt=""
                    className='shadow-white'
                />
            </div>
            <div className='flex flex-col gap-4 items-start justify-start xs:items-center xs:justify-center w-[50%] xs:w-[100%]' >
                <div className='text-4xl font-semobold w-[50%] xs:w-[100%] xs:text-2xl xs:text-center'>
                    Become an 
                    <HightlightText text={"instructor"} />
                </div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300 xs:w-[100%] xs:text-[12px] xs:px-4'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>


                <div className='w-fit font-bold mt-8 xs:mt-4 '>
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
