import React from "react";
import IconBtn from "../../../comman/IconBtn";
import { GrFormAdd } from "react-icons/gr"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from "react-router-dom";


const MyCourse = () => {
 const navigate =  useNavigate();
  return (
    <div className="flex w-full gap-4 gap-y-8 flex-col ">
      <div className="flex w-full justify-between">
        <h1 className="text-richblack-5 mb-18 text-3xl font-medium ">
          My Course
        </h1>
        <IconBtn onclick={()=> navigate("/dashboard/add-course")}  name={"Add Course"}><GrFormAdd /></IconBtn>
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
            
              <Tr>
                <Td className="py-10  text-center text-2xl font-medium text-richblack-100">
                  No courses found
                  {/* TODO: Need to change this state */}
                </Td>
              </Tr>
            
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyCourse;
