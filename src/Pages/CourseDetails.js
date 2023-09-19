import React from 'react'
import CourseCardDetails from '../components/core/Catalog/CourseCardDetails'

const CourseDetails = () => {
    return (
        <>
            <div className='relative w-full  bg-richblack-800'>
                {/* Hero Section */}
                <div className='w-full box-content mx-auto  min-h-[450px]'>
                    <div className=' flex mx-auto justify-between my-auto py-24 w-8/12'>
                        <div className='flex flex-col justify-center gap-4 py-5  text-white'>
                            <h1 className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>HTML Basics</h1>
                            <p className='text-richblack-200'> This is for the basics of HTML</p>
                            <p className='text-richblack-5'> Created By Akshit Sangwan</p>
                            <p>Created at August 2, 2023 | 10:50 PM English</p>
                        </div>
                        <div className='right-[20rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block'>
                            <CourseCardDetails />
                        </div>
                    </div>
                </div>
                {/* section 2 */}

            </div>
            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <div className='mt-16 mx-auto max-w-maxContent lg:mx-0 xl:max-w-[810px]'>
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What you'll learn</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CourseDetails