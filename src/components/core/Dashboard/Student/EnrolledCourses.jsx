import React, { useEffect, useState } from "react";
import NavLocation from "./../NavLocation";
import { useSelector } from "react-redux";
import { getStudentEnrolledCourse } from "../../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {


  const { token } = useSelector((state) => state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const navigate = useNavigate()

  const getEnrolledCourses = async () => {
    try {
      const res = await getStudentEnrolledCourse(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlemenu = () => {
    alert("Hello")
  }

  return (
    <div className="flex flex-col w-full gap-24">
      <div className="flex flex-col gap-8">
        <NavLocation />
        <h1 className="text-richblack-5 text-3xl font-medium">Enrolled Courses</h1>
      </div>
      <div>
        <table className="border border-collapse rounded-md border-richblack-700 py-8 w-full table-auto">
          <thead className="text-richblack-5 py-8  rounded-md text-left">
            <tr className="bg-richblack-500 py-8" colSpan="2">
              <th className="py-4 px-2 ">Course </th>
              <th>Durations</th>
              <th colSpan="2">Progress</th>
            </tr>
          </thead>
          <tbody className=" text-richblack-5 ">
            {

              (enrolledCourses) ?
                enrolledCourses?.map((course, i) => {
                  return (
                    <tr className=" border-richblack-700 border" key={i}>
                      <td data-label="Course Name" className="py-4 px-4 h-3">
                        <div className="flex  items-center gap-3  w-[75%] cursor-pointer" onClick={() => { navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`) }} >
                          <img alt="" src={course?.thumbnail} width={"100px"} height={"100px"} className="rounded hidden md:block" />
                          <div className="flex flex-col gap-3 ml-3">
                            <h2 className="text-richblack-25  font-bold">{course.courseName}</h2>
                            <p className="text-richblack-200 text-justify hidden md:block">
                              {course.courseDescription.indexOf('.') !== -1 ? course.courseDescription.substr(0, course.courseDescription.indexOf('.')) : course.courseDescription}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td data-label="Durations" className="py-4 px-4 h-3">Malcolm Lockyer</td>
                      <td className="py-4 px-4 h-3">1961</td>
                      <td className="py-4 px-4 h-3">
                        <button onClick={handlemenu}>
                          <ul className="m-0">
                            <li className="font-semibold text-xl">.</li>
                            <li className="-mt-4 font-semibold text-xl">.</li>
                            <li className="-mt-4 font-semibold text-xl">.</li>
                          </ul>
                        </button>
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="text-white w-full text-center py-4">
                        <h2>There is no course enrolled</h2>
                      </div>
                    </td>
                  </tr>
                )
            }




          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledCourses;
