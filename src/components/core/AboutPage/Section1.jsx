import React from 'react'
import BannerImage1 from "../../../assets/Images/aboutus1.webp";
import BannerImage2 from "../../../assets/Images/aboutus2.webp";
import BannerImage3 from "../../../assets/Images/aboutus3.webp";
import { HightlightText } from '../HomePages/HightlightText';
const Section1 = () => {
  return (
    <div className="bg-richblue-700  ">
    <div className="relative mx-auto flex w-11/12 xl:max-w-maxContent flex-col justify-around xl:gap-10 gap-2 text-center text-white">
      <div className=" mx-auto md:mt- w-[75%] mt-8 xl:w-[80%] xl:py-20 xs:w-[100%] flex flex-col gap-4 ">
        <h1 className="xl:text-2xl text-xl text-white text-center  font-semibold shadow-[10px_10px_0px_0px_rgba(254, 255, 255, 0.18) inset]">
          About Us
        </h1>
        <div className="xl:text-4xl xs:text-2xl text-lg text-white text-center  font-semibold">
          Driving Innovation in Online Education for a<br />
          <HightlightText text={"Brighter Future"} />
        </div>
        <p className="text-richblack-300 text-center  xl:text-[1.225rem] xl:leading-[1.925rem] mt-4">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies,
          and nurturing a vibrant learning community.
        </p>
      </div>
      <div className="h-[00px] xl:h-[150px]"></div>
      <div className="xl:absolute xl:left-[50%] xl:bottom-0 xl:translate-x-[-50%] xl:translate-y-[40%] translate-y-[10%] flex justify-center xl:justify-evenly items-center  gap-8 flex-col  xl:flex-row">
        <img src={BannerImage1} alt="" className="shadow-lg rounded-lg hover:scale-105 transition-all duration-200" />
        <img src={BannerImage2} alt="" className="shadow-lg rounded-lg hover:scale-105 transition-all duration-200" />
        <img src={BannerImage3} alt="" className="shadow-lg rounded-lg hover:scale-105 transition-all duration-200" />
      </div>
    </div>
  </div>
  )
}

export default Section1