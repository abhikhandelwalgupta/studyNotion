import React from 'react'

const CourseCardDetails = ({course}) => {
    console.log(course?.data);
    const {
        price,
        thumbnail,
        instructions
    } = course?.data

    console.log(instructions);
    return (
        <>

            <div className='bg-richblack-700 rounded-2xl '>
                <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 fixed'>
                    <img src={`${thumbnail}`} alt='Course images' className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full" />
                    <div className="px-4">
                        <div className="space-x-3 pb-4 text-3xl font-semibold">
                            Rs. {price}
                        </div>
                        <div className='flex flex-col gap-4'>

                            <button
                                className="yellowButton"

                            >
                                Buy Now

                            </button>
                            <button className="blackButton">
                                Add to Cart
                            </button>

                        </div>
                        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>
                    <div className=' px-4 my-2 text-xl font-semibold'>
                        <p>This Course Includes :</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseCardDetails