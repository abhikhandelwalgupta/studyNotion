import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getInstructorCourse } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import InstructorChart from './InstructorChart';

const Instructor = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    const [courses, setCourses] = useState([])

    const [instructorCourse, setInstructorCourse] = useState([]);

    const fetchInstructorCourse = async () => {

        const instructorApiData = await getInstructorData(token)
        const result = await getInstructorCourse(token)
        console.log(instructorApiData);

        if (instructorApiData.length) setInstructorCourse(instructorApiData)
        if (result) {
            setCourses(result)
        }
    }
    useEffect(() => {
        console.log(instructorCourse);
        fetchInstructorCourse()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const totalAmount = instructorCourse?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    )
    const totalStudents = instructorCourse?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    )


    return (
        <>

            <div className='flex md:flex-col flex-col gap-3'>
                <h1 className='text-richblack-5 capitalize text-2xl font-bold '>Hi {user?.firstName} {user?.lastName}  👋 </h1>
                <p className='text-richblack-200 font-medium'>Let's start Something new</p>
            </div>
            <div className='w-full my-4 md:flex-row flex-col  md:h-[450px] gap-3 flex '>
                <div className='bg-richblack-800 flex-1   rounded-md '>
                    <div className='py-6 px-6 className="my-4 flex h-[450px] space-x-4 space-y-8"'>

                        {totalAmount > 0 || totalStudents > 0 ? (
                            <InstructorChart courses={instructorCourse} />
                        ) : (
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                                <p className="mt-4 text-xl font-medium text-richblack-50">
                                    Not Enough Data To Visualize
                                </p>
                            </div>
                        )}
                    </div>

                </div>
                <div className='bg-richblack-800  min-w-[250px]  rounded-md'>
                    <div className='py-6 px-6'>
                        <p className="text-lg font-bold text-richblack-5">Statistics</p>
                        <div className='flex flex-col my-5 gap-3'>
                            <p className='text-lg text-richblack-200'>Total Courses</p>
                            <p className='text-3xl text-richblack-50 font-semibold'>{instructorCourse.length}</p>
                        </div>
                        <div className='flex flex-col my-5 gap-3'>
                            <p className='text-lg text-richblack-200'>Total Students</p>
                            <p className='text-3xl text-richblack-50 font-semibold'>{totalStudents}</p>
                        </div>
                        <div className='flex flex-col my-5 gap-3'>
                            <p className='text-lg text-richblack-200'>Total Income</p>
                            <p className='text-3xl text-richblack-50 font-semibold'>{totalAmount}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full bg-richblack-800 min-h-min p-6 rounded-md' >
                <div className='flex justify-between'>
                    <p className='text-lg font-bold text-richblack-5'>Your Courses</p>
                    <Link to="/dashboard/my-courses">
                        <p className="text-xs font-semibold text-yellow-50">View All</p>
                    </Link>
                </div>
                <div className='flex'>
                    <div className="my-4 flex   md:flex-row flex-col gap-8 md:gap-0 md:items-start items-center md:space-x-6">
                        {courses.slice(0, 3).map((course) => (
                            <div key={course._id} className="md:w-1/3">
                                <img
                                    src={course.thumbnail}
                                    alt={course.courseName}
                                    className="h-[201px] w-[550px]  rounded-md object-cover"
                                />
                                <div className="mt-3 w-full">
                                    <p className="text-sm font-medium text-richblack-50">
                                        {course.courseName}
                                    </p>
                                    <div className="mt-1 flex items-center space-x-2">
                                        <p className="text-xs font-medium text-richblack-300">
                                            {course.studentsEnrolled.length} students
                                        </p>
                                        <p className="text-xs font-medium text-richblack-300">
                                            |
                                        </p>
                                        <p className="text-xs font-medium text-richblack-300">
                                            Rs. {course.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Instructor