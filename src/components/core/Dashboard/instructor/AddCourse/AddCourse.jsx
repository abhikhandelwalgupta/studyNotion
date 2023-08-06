import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {

    return (
        <div className="flex w-full items-start gap-x-6">
            <div className='flex flex-1 flex-col'>
                <h1 className='text-richblack-5 text-3xl font-medium'>Add Course</h1>
                <div className='flex flex-col mt-10'>
                    <RenderSteps/>
                </div>
            </div>

            <div className='bg-richblack-800 sticky max-w-[400px]  flex-1 rounded-md  p-6  border-[1px] border-richblack-700   xl:block top-10 hidden text-richblack-5   px-4  shadow'>
                <p className='mb-8 text-lg text-richblack-5'>⚡ Course Upload Tips</p>
                <ul className="list-disc  px-2  space-y-4 text-xs  text-richblack-5">
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.
                    </li>
                    <li> Course Builder is where you create & organize a course.
                    </li>
                    <li>Add Topics in the Course Builder section to create lessons,<br /> quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse