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
      <div className="py-20">
        <table className="md:border border-collapse rounded-md border-richblack-700 py-8 w-full table-auto">
          <thead className="text-richblack-5   rounded-md text-left !ml-4 py-4 !px-12">
            <tr className="border border-collapse rounded-md border-richblack-700 !py-20">
              <th  >Course </th>
              <th>Purchase Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody >
            {
              (enrolledCourses) ?
                enrolledCourses?.map((course, i) => {
                  return (
                    <tr key={i}>
                      <td data-label="Course :">
                        <div className="flex items-center gap-8">
                          <img alt="" src={course?.thumbnail} width={"100px"} height={"100px"} className="md:block hidden rounded" />
                          <h2 className="text-richblack-25  font-bold">{course.courseName}</h2>
                        </div>
                      </td>
                      <td data-label="Purchase Date :">{course.createAt.split("T")[0]}</td>
                      <td data-label="Amount :">{course.price}.00</td>
                    </tr>
                  )
                }) :
                (
                  <tr>
                    <td colSpan={3}>
                      <div className="text-white w-full text-center py-4">
                        <h2>There is no course Purchased </h2>
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

export default PurchaseHistory;
