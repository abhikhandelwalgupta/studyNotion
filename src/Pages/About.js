import React from "react";
import { HightlightText } from "../components/core/HomePages/HightlightText";

import Footer from "../components/comman/Footer";
import Section1 from "../components/core/AboutPage/Section1";
import { StoryVision } from "../components/core/AboutPage/StoryVision";
import Counter from "../components/core/AboutPage/Counter";
import { LearningGrid } from "../components/core/AboutPage/LearningGrid";


const About = () => {
  return (
    <div>
        {/* section-1 */}
      <Section1/>
      <div className="h-[100px] xl:h-[150px]"></div>
      {/* section 2 */}
      <section className="border-b border-richblack-700">
        <div className="relative w-11/12 max-w-maxContent xl:mt-8 py-5 md:mt-6 mt-6 mx-auto flex items-center ">
          <div className="h-[100px"></div>
          <p className="text-richblack-100 xl:text-4xl text-xl xl:leading-[2.75rem] xl:pb-20 md:pb-18 pb-16 text-center font-semibold">
            <sup className="text-richblack-600 text-4xl">&#8220;</sup> We are
            passionate about revolutionizing the way we learn. Our innovative
            platform <HightlightText text={"combines technology"} />,{" "}
            <HightlightText
              text={"expertise"}
              color={"gradient-text-semi-yellow"}
            />
            , and community to create{" "}
            <HightlightText
              text={"an unparalleled educational experience"}
              color={"gradient-text-yellow"}
            />{" "}
            . <span className="text-richblack-600 text-4xl mt-6"> &rdquo;</span>
          </p>
        </div>
      </section>
      {/* section 3*/}
      <section className="xl:py-6">
       <StoryVision/>
      </section>
      {/* section 4 */}
      <section className="bg-richblack-700 mt-16">
       <Counter/>
      </section>
      {/* section5 */}
      <section className="mt-20">
        <LearningGrid/>
      </section>

      {/* Contact Us */}
      
      <div className="h-[100px] xl:h-[150px]"></div>
      <Footer />
    </div>
  );
};

export default About;
