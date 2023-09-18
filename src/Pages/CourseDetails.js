import React from 'react'

const CourseDetails = () => {
    return (
        <div className='relative w-full  bg-richblack-800'>
            {/* Hero Section */}
            <div className=' mx-auto box-content px-4 lg:w-[1260px] 2xl:relative '>
                <div className='mx-auto  grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                    <div className='flex flex-col justify-center gap-4 py-5  text-white'>
                        <h1 className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>HTML Basics</h1>
                        <p className='text-richblack-200'> This is for the basics of HTML</p>
                        <p className='text-richblack-5'> Created By Akshit Sangwan</p>
                        <p>Created at August 2, 2023 | 10:50 PM English</p>
                    </div>
                    <div>

                        <img src='https://res.cloudinary.com/dupgq1lsu/image/upload/v1693190964/Home/studyNotion/swrys3fqbk6300wyhb41.png' alt='' />

                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails