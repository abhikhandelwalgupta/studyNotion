import React from 'react'
import { RxDropdownMenu } from "react-icons/rx"
import { useSelector } from 'react-redux';

const NestedView = () => {
    const { course } = useSelector((state) => state.course)
    console.log(course?.courseContent);
    return (
        <div className='bg-richblack-700 border border-richblack-600 rounded-md'>
            <div className='p-4 '>
                {
                    course?.courseContent.map((section) => (

                        <details key={course._id} className='border-b border-richblack-100 space-y-2'>
                            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                                    <p className="font-semibold text-richblack-50">
                                        {section.sectionName}
                                    </p>
                                </div>
                            </summary>
                        </details>

                    ))
                }

            </div>
        </div>
    )
}

export default NestedView