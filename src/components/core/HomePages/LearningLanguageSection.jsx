import React from "react";
import { HightlightText } from "./HightlightText";
export const LearningLanguageSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 font-[500]">
      <div className="text-center text-4xl font-semibold mt-12">
        Your swiss knife for <HightlightText text={" learning any language"} />
      </div>
      <p className="text-center text-richblack-600 text-base font-medium w-8/12 mx-auto">
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more.{" "}
      </p>

      <div className="flex flex-row items-center justify-center mt-5">

      </div>
    </div>
  );
};
