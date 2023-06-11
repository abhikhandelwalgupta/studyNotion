import React from "react";
import productImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const timeLine = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
];

export const TimelineSection = () => {
  return (
    
      <div className="flex flex-row items-center justify-center  gap-20  w-full">
        <div className="w-[40%]">
          {timeLine.map((element, index) => {
            return (
              <div
                className="flex items-center justify-center w-full gap-8  my-12"
                key={index}
              >
                <div
                  className={`rounded-[100%] py-3 px-4 bg-[#f0ececf3] ${
                    index < timeLine.length - 1 ? "numberCircle" : ""
                  } flex items-center`}
                >
                  <input
                    type="image"
                    img
                    src={element.Logo}
                    alt="logo image "
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-bold">{element.heading}</div>
                  <div>{element.Description}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative  shadow-blue-200 w-[50%]">
          <input
            type="image"
            img
            src={productImage}
            alt="image"
            loading="lazy"
            className="box-shadow-3d object-cover"
            width={"100%"}
          />
          <div
            className="absolute bg-caribbeangreen-700 flex flex-row  text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">TYpe of Courses</p>
            </div>
          </div>
        </div>
      </div>
    
  );
};
