import React from 'react'
import { useSelector } from 'react-redux'

const Instructor = () => {
    const { user } = useSelector((state) => state.profile)
    console.log(user);
    return (
        <>

            <div className='flex flex-col gap-3'>
                <h1 className='text-richblack-5 capitalize text-2xl font-bold '>Hi {user?.firstName} {user?.lastName}  👋 </h1>
                <p className='text-richblack-200 font-medium'>Let's start Something new</p>
            </div>
            <div className='w-full my-4  h-[450px] gap-3 flex'>
                <div className='bg-richblack-800 flex-1   rounded-md '>
                    <div className='py-6 px-6'>
                        <p className="text-lg font-bold text-richblack-5">Visualize</p>
                    </div>
                </div>
                <div className='bg-richblack-800  min-w-[250px]  rounded-md'>
                    <div className='py-6 px-6'>
                        <p className="text-lg font-bold text-richblack-5">Statistics</p>
                        <div className='flex flex-col my-5 gap-3'>
                            <p className='text-lg text-richblack-200'>Total Courses</p>
                            <p className='text-3xl text-richblack-50 font-semibold'>{Object.keys(user.courses).length}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Instructor