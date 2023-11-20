import React, { useEffect, useState } from "react";
import IconBtn from "../../../comman/IconBtn";
import { GrFormAdd } from "react-icons/gr";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { CourseDelete, getInstructorCourse } from "../../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";
import { HiClock } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { COURSE_STATUS } from "../../../../utils/constants";
import { formatDate } from "../../../../services/formatDate";



const MyCourse = () => {

  const { token } = useSelector((state) => state.auth)
  const [instructorCourse, setInstructorCourse] = useState([]);
  const TRUNCATE_LENGTH = 30
  const fetchInstructorCourse = async () => {
    const result = await getInstructorCourse(token)

    setInstructorCourse(result)
  }
  useEffect(() => {
    fetchInstructorCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCourseDelete = async (courseId) => {
    await CourseDelete(courseId, token)
    fetchInstructorCourse()
  }

  const navigate = useNavigate();

  return (
    <div className="flex w-full gap-4 gap-y-8 flex-col ">
      <div className="flex md:flex-row max-w-fit md:max-w-none flex-col	 justify-between">
        <h1 className="text-richblack-5 mb-18 text-3xl font-medium ">
          My Course
        </h1>
        <IconBtn onclick={() => navigate("/dashboard/add-course")} name={"Add Course"}><GrFormAdd /></IconBtn>
      </div>
      <div className="w-full mt-8">
        <div className="flex bg-richblack-700 text-richblack-5 text-lg py-3  gap-4 px-2 rounded-md">
          <p className="w-[50%]"> Courses</p>
          <p className="w-[20%]">Duration</p>
          <p className="w-[10%]">Price</p>
          <p className="2-[20%]">Actions</p>
        </div>
        {
          !instructorCourse ?
            <div className="grid min-h-[100vh-3.5rem] place-content-center">
              <div className="spinner"></div>
            </div> :
            !instructorCourse.length ?
              <div className="w-full flex items-center justify-center py-4">
                <p className="text-richblack-5 ">You have not published any course yet!!</p>
              </div>
              :
              instructorCourse.map((course, i, arr) => (
                <div className={`flex items-center border border-richblack-700 text-richblack-100  gap-4 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                  }`}
                  key={i}>
                  <div className="flex items-center   w-[50%] gap-4 px-2 py-2">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      width={"100px"} height={"100px"}
                      className="h-[100px] w-[120px] rounded-lg object-cover md:block hidden"
                    />
                    <div className="flex flex-col justify-center gap-3 text-richblack-5">
                      <p>{course.courseName}</p>
                      <p className="text-xs text-richblack-300">
                        {course.whatYouWillLearn.split(" ").length >
                          TRUNCATE_LENGTH
                          ? course.whatYouWillLearn
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                          : course.whatYouWillLearn}
                      </p>
                      <p className="md:block hidden">created : {formatDate(course.createAt)}</p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          Drafted
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </div>
                          Published
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="w-[20%]"> 2hr 30min </p>
                  <p className="w-[10%]">{course.price}</p>
                  <p className="2-[20%]"><button

                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                    <button onClick={() => handleCourseDelete(course._id)}>
                      <RiDeleteBin6Line size={20} />
                    </button></p>

                </div>
              ))





        }

      </div>
    </div>
  );
};

export default MyCourse;
