import React from 'react'
import { HightlightText } from '../HomePages/HightlightText'
import FoundingStory from "../../../assets/Images/FoundingStory.png";

export const StoryVision = () => {
  return (
    <div className="max-w-maxContent w-11/12 mx-auto mt-20">
    <div className="flex gap-y-28 flex-col  justify-between items-center">
      <div className=" flex justify-between items-center lg:flex-nowrap flex-wrap px-6  gap-6 flex-row  ">
        <div className="flex flex-col text-white gap-8">
          <h2 className="lg:text-4xl text-2xl md:text-start text-center">
            <HightlightText
              text={"Our Founding Story"}
              color={"gradient-text-red"}
            />
          </h2>
          <div className="lg:w-[75%] flex text-justify gap-4 flex-col items-center justify-center font-inter font-medium text-richblack-300 font-xl">
            <p>
              {" "}
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a
              group of educators, technologists, and lifelong learners who
              recognized the need for accessible, flexible, and
              high-quality learning opportunities in a rapidly evolving
              digital world.
            </p>

            <p>
              As experienced educators ourselves, we witnessed firsthand
              the limitations and challenges of traditional education
              systems. We believed that education should not be confined
              to the walls of a classroom or restricted by geographical
              boundaries. We envisioned a platform that could bridge these
              gaps and empower individuals from all walks of life to
              unlock their full potential.
            </p>
          </div>
        </div>
        <img
          src={FoundingStory}
          className="rounded-md  shadow-md leading-6"
        />
      </div>
      <div className="w-[100%] flex text-richblack-300 text-base leading-6 text-justify gap-8 justify-between items-start mt-20 lg:flex-row flex-col px-6 ">
        <div className="flex flex-col gap-6 lg:w-[40%]">
          <p className="lg:text-start text-center text-4xl ">
            <HightlightText
              text={"Our Vision"}
              color={"gradient-text-yellow"}
            />
          </p>
          <p>
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people
            learn. Our team of dedicated experts worked tirelessly to
            develop a robust and intuitive platform that combines
            cutting-edge technology with engaging content, fostering a
            dynamic and interactive learning experience.
          </p>
        </div>
        <div className="flex  flex-col  gap-6 lg:w-[40%]">
          <p className="lg:text-start text-center text-4xl">
            <HightlightText text={"Our Mission"} />
          </p>
          <p>
            our mission goes beyond just delivering courses online. We
            wanted to create a vibrant community of learners, where
            individuals can connect, collaborate, and learn from one
            another. We believe that knowledge thrives in an environment
            of sharing and dialogue, and we foster this spirit of
            collaboration through forums, live sessions, and networking
            opportunities.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
