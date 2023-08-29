import React from 'react'

const PublishCourse = () => {
    return (
        <>
            <div className='text-richblack-5 bg-richblack-800 w-full p-6 rounded-lg border-[1px] border-richblack-600 shadow'>
                <p className="text-2xl font-semibold text-richblack-5">
                    Publish Settings
                </p>
                <div className='mt-8'>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="public"    className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5" />
                    <label for="vehicle1" className='label-style text-richblack-300'> Make this course as public   </label><br />
                </div>
            </div>
        </>
    )
}

export default PublishCourse