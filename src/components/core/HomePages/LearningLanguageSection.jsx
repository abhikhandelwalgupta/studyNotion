import React from "react";
import { HightlightText } from "./HightlightText";
import progress from "../../../assets/Images/Know_your_progress.svg"
import compare from "../../../assets/Images/Compare_with_others.svg"
import lessons from "../../../assets/Images/Plan_your_lessons.svg"
import { CTABUTTON } from "./Button";
export const LearningLanguageSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mb-20 font-[500] py-2">
      <div className="text-center text-4xl xs:text-2xl font-semibold mt-12">
        Your swiss knife for <HightlightText text={" learning any language"} />
      </div>
      <p className="text-center text-richblack-600 text-base font-medium w-8/12 xs:w-[100%] mx-auto">
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more.{" "}
      </p>

      <div className="flex flex-row items-center justify-center mt-5 xs:mt-0  xs:w-[50%] ">
        <img src={progress} alt="know your progress" loading="lazy" className="object-contain -mr-28 xs:-mr-14  xs:h-48 xs:w-9/12  "/>
        <img src={compare} alt="know your progress" loading="lazy" className="object-contain xs:h-48 xs:w-11/12 "/>
        <img src={lessons} alt="know your progress" loading="lazy" className="-ml-32 object-contain xs:-ml-14 xs:h-48 xs:w-11/12"/>
      </div>

      <div className='w-fit xs:w-[50%]'>
                <CTABUTTON active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                </CTABUTTON>
            </div>
    </div>
  );
};
