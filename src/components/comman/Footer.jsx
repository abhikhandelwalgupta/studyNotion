import React from "react";
import { SectionOne } from "../footerSection/SectionOne";
import Resource from "../footerSection/Resource";
import PlanandCommunity from "../footerSection/PlanandCommunity";
import Subjects from "../footerSection/Subjects";
import Language from "../footerSection/Language";
import CareerBuilding from "../footerSection/CareerBuilding";
import { Link } from "react-router-dom";
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
// import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-richblack-600  text-richblack-400">
      <div className=" w-11/12 max-w-maxContent flex text-richblack-400 leading-4  py-14 items-center gap-3 mt-4 mx-auto justify-between font-inter">
        <div className="border-b w-[100%] flex flex-col lg:flex-row   pb-5 border-richblack-700 ">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between  items-start   pl-3 lg:pr-5 gap-3  ">
            <SectionOne />
            <Resource />
            <PlanandCommunity />
          </div>

          {/* section 2 */}
          <div className="flex flex-row w-[50%] flex-wrap lg:items-start items-center  justify-around gap-4 ">
            <Subjects />
            <Language />
            <CareerBuilding />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-11/12 lg:-mt-8 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            Made with ?? Abhishek © 2023 Studynotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
