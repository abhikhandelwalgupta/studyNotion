import React from "react";
import laptop from "../../../../assets/Images/wishlistImage.jpg"

import NavLocation from "./../NavLocation";

const EnrolledCourses = () => {
 
  // console.log(noEmptyStrings); 

  return (
    <div className="flex flex-col w-full gap-24">
      <div className="flex flex-col gap-8">
       <NavLocation />
      <h1 className="text-richblack-5 text-3xl font-medium">EnrolledCourses</h1>
      </div>
      <div>
        <table className="border border-collapse rounded-md border-richblack-700 py-8 w-full table-auto">
          <thead className="text-richblack-5 py-8  rounded-md text-left">
            <tr className="bg-richblack-500 py-8" colSpan="2">
              <th className="py-4 px-2 ">Course Name</th>
              <th>Durations</th>
              <th colSpan="2">Progress</th>
            </tr>
          </thead>
          <tbody className=" text-richblack-5 py-8  text-left">
            <tr className=" border-richblack-700 border">
              <td className="py-4 px-4 h-3">
                <div className="flex  items-center gap-3">
                  <img alt="" src={laptop} width={"100px"} height={"100px"} className="rounded" />
                <p>The Sliding Mr. Bones (Next Stop, Pottersville)</p>
                </div>
              </td>
              <td className="py-4 px-4 h-3">Malcolm Lockyer</td>
              <td className="py-4 px-4 h-3">1961</td>
              <td className="py-4 px-4 h-3">
                <button>
                  <ul className="m-0">
                    <li className="font-semibold text-xl">.</li>
                    <li className="-mt-4 font-semibold text-xl">.</li>
                    <li className="-mt-4 font-semibold text-xl">.</li>
                  </ul>
                </button>
              </td>
            </tr>
            <tr className="py-4 border-richblack-700 border">
            <td className="py-4 px-4 h-3">
                <div className="flex  items-center gap-3">
                  <img alt="" src={laptop} width={"100px"} height={"100px"} className="rounded" />
                <p>The Sliding Mr. Bones (Next Stop, Pottersville)</p>
                </div>
              </td>
              <td className="py-4 px-4 h-3">Malcolm Lockyer</td>
              <td className="py-4 px-4 h-3">1961</td>
              <td className="py-4 px-4 h-3">
                <button>
                  <ul className="m-0">
                    <li className="font-semibold text-xl">.</li>
                    <li className="-mt-4 font-semibold text-xl">.</li>
                    <li className="-mt-4 font-semibold text-xl">.</li>
                  </ul>
                </button>
              </td>
            </tr>
            <tr className="py-4 border-richblack-700 border">
            <td className="py-4 px-4 ">
                <div className="flex  items-center gap-3">
                  <img alt="" src={laptop} width={"100px"} height={"100px"} className="rounded" />
                <p className="">The Sliding Mr. Bones (Next Stop, Pottersville)</p>
                </div>
              </td>
              <td className="py-4 px-4 ">Malcolm Lockyer</td>
              <td className="py-4 px-4 h-3">1961</td>
              <td className="py-4 px-4 h-3 cursor-pointer">
                <button onClick={()=> alert("Hello")}>
                  <ul className="m-0">
                    <li className="font-semibold text-xl">.</li>
                    <li className="-mt-4 font-semibold text-xl">.</li>
                    <li className="-mt-4 font-semibold text-xl">.</li>
                  </ul>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledCourses;
