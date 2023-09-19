import React from 'react'

const CourseCardDetails = () => {
    return (
        <>

            <div className='bg-richblack-700 rounded-2xl'>
                <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 '>
                    <img src='https://res.cloudinary.com/dupgq1lsu/image/upload/v1693190964/Home/studyNotion/swrys3fqbk6300wyhb41.png' alt='Course images' className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full" />
                    <div className="px-4">
                        <div className="space-x-3 pb-4 text-3xl font-semibold">
                            Rs. 0
                        </div>
                        <div className='flex flex-col gap-4'>

                            <button
                                className="yellowButton"

                            >
                                Go To Course

                            </button>
                            <button className="blackButton">
                                Add to Cart
                            </button>

                        </div>
                        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseCardDetails