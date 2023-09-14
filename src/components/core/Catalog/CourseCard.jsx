import React, { lazy } from 'react'
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {


  return (
    <Link to={`/courses/${course?._id}`}>
      <div className='container bg-richblack-900 shadow-md rounded-md'>
        <img src={course?.thumbnail} alt='' loading={lazy} className='w-full h-[250px] bg-center object-cover  rounded-t-lg' />
        <div className='flex flex-col gap-2 py-2 px-4'>
          <h2> {course?.courseName}</h2>
          <p className="text-sm text-richblack-50 capitalize font-normal">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2">

          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard