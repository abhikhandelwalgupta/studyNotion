import React, { useEffect, useState } from "react";
import NavLocation from "./../NavLocation";
import { getStudentEnrolledCourse } from "../../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const PurchaseHistory = () => {

  const { token } = useSelector((state) => state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const res = await getStudentEnrolledCourse(token);
      console.log(res);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-richblack-5">
      <div className="flex gap-8 flex-col">
        <NavLocation />
        <h1 className="text-richblack-5 font-medium text-3xl leading-8">
          Purchase History
        </h1>
      </div>
      <div className="py-20 text-richblack-5">
        <div className="flex gap-3 w-full bg-richblack-500 py-3 px-2">
          <p className="w-[45%]">Course</p>
          <p className="w-[30%]">Purchase</p>
          <p className="w-[25%]">Amount</p>
        </div>
        {
          (!enrolledCourses) ?
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
              <div className="spinner"></div>
            </div> :
            !enrolledCourses.length ?
              <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                You have not Purchase in any course yet.
              </p> :
              enrolledCourses.map((course, i) => (
                <div className=" flex  items-center border border-richblack-700 p-2 " key={i}>
                  <div className="flex items-center gap-8 w-[45%]">
                    <img alt="" src={course?.thumbnail} width={"100px"} height={"100px"} className="md:block hidden rounded  object-cover" />
                    <h2 className="text-richblack-25  font-bold">{course.courseName}</h2>
                  </div>
                  <p className="w-[30%]">{course.createAt.split("T")[0]}</p>
                  <p className="w-[25%]">{course.price}.00</p>
                </div>
              ))

        }

      </div>
    </div>
  );
};

export default PurchaseHistory;
