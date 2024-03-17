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
    <div className="bg-richblack-800  text-richblack-400">
      <div className=" w-11/12 max-w-maxContent flex text-richblack-400 leading-4  py-14 items-center gap-3 mt-4 mx-auto justify-between font-inter">
        <div className="border-b w-[100%] flex flex-col xl:flex-row pb-8 gap-12 xl:gap-0  xl:pb-12 xl:border-richblack-500 ">
          {/* Section 1 */}
          < div className="xl:w-[50%] w-full flex flex-wrap flex-row justify-between  items-start   pl-3 xl:pr-5 gap-3  ">
            <SectionOne />
            <Resource />
            <PlanandCommunity />
          </div>

          {/* section 2 */}
          <div className="  xl:w-[50%] w-full flex flex-wrap flex-row items-start   pl-3  justify-between xl:gap-4 ">
            <Subjects />
            <Language />
            <CareerBuilding />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-11/12 -mt-8 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between  xl:items-start w-full xl:flex-row xs:flex-col  gap-3">
          <div className="flex flex-row flex-wrap xs:flex-nowrap xs:items-center xs:justify-center">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 xs:px-2`}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            Made with <span className="text-red-5"> ❤️</span> Abhishek © 2023 Studynotion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
