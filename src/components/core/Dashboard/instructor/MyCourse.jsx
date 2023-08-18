import React, { useEffect, useState } from "react";
import IconBtn from "../../../comman/IconBtn";
import { GrFormAdd } from "react-icons/gr"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from "react-router-dom";
import { getInstructorCourse } from "../../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"

const MyCourse = () => {

  const { token } = useSelector((state) => state.auth)
  const [instructorCourse, setInstructorCourse] = useState([]);
  const TRUNCATE_LENGTH = 30
  const fetchInstructorCourse = async () => {
    const result = await getInstructorCourse(token)
    console.log(result);
    setInstructorCourse(result)
  }
  useEffect(() => {
    fetchInstructorCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCourseDelete = (courseId)=> {
    console.log(courseId);
  }

  const navigate = useNavigate();

  return (
    <div className="flex w-full gap-4 gap-y-8 flex-col ">
      <div className="flex w-full justify-between">
        <h1 className="text-richblack-5 mb-18 text-3xl font-medium ">
          My Course
        </h1>
        <IconBtn onclick={() => navigate("/dashboard/add-course")} name={"Add Course"}><GrFormAdd /></IconBtn>
      </div>
      <div className="w-full mt-8">
        <Table className="rounded-xl w-full border border-richblack-800 ">
          <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
              <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                Courses
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Duration
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Price
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              instructorCourse.map((course, index) => (
                <Tr key={course._id}
                  className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                  <Td className="flex flex-1 gap-x-4 text-richblack-100" >


                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                    />
                    <div>
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
                    </div>

                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    2hr 30min
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    ₹{course.price}
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100  ">
                    <button

                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button onClick={()=> handleCourseDelete(course._id)}>
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              )
              )
            }


          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyCourse;
