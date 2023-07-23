import React from 'react'
import BannerImage1 from "../../../assets/Images/aboutus1.webp";
import BannerImage2 from "../../../assets/Images/aboutus2.webp";
import BannerImage3 from "../../../assets/Images/aboutus3.webp";
import { HightlightText } from '../HomePages/HightlightText';
const Section1 = () => {
  return (
    <div className="bg-richblue-700  ">
    <div className="relative mx-auto flex w-11/12 lg:max-w-maxContent flex-col justify-around lg:gap-10 gap-2 text-center text-white">
      <div className=" mx-auto md:mt- w-[75%] mt-8 lg:w-[80%] lg:py-20 flex flex-col gap-4 ">
        <h1 className="lg:text-2xl text-xl text-white text-center  font-semibold shadow-[10px_10px_0px_0px_rgba(254, 255, 255, 0.18) inset]">
          About Us
        </h1>
        <div className="lg:text-4xl  text-lg text-white text-center  font-semibold">
          Driving Innovation in Online Education for a<br />
          <HightlightText text={"Brighter Future"} />
        </div>
        <p className="text-richblack-300 text-center  lg:text-[1.225rem] lg:leading-[1.925rem] mt-4">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies,
          and nurturing a vibrant learning community.
        </p>
      </div>
      <div className="h-[00px] lg:h-[150px]"></div>
      <div className="lg:absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[40%] translate-y-[10%] flex justify-center lg:justify-evenly items-center  gap-8 flex-col  lg:flex-row">
        <img src={BannerImage1} alt="" className="shadow-lg rounded-lg hover:scale-105 transition-all duration-200" />
        <img src={BannerImage2} alt="" className="shadow-lg rounded-lg hover:scale-105 transition-all duration-200" />
        <img src={BannerImage3} alt="" className="shadow-lg rounded-lg hover:scale-105 transition-all duration-200" />
      </div>
    </div>
  </div>
  )
}

export default Section1