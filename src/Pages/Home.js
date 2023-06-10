import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HightlightText } from "../components/core/HomePages/HightlightText";
import { CTABUTTON } from "../components/core/HomePages/Button";
import Banner from "../assets/Images/banner.mp4"

export const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative flex flex-col items-center justify-center mx-auto w-11/12 max-w-maxContent text-white">
        <Link to={"/signup"}>
          <div className="mt-16 pl-1 group bg-richblack-800 rounded-full mx-auto font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
            <div className="flex gap-2 items-center px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 text-lg font-w">
              <p>Become an Instructor</p>
              <BsArrowRightShort />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-12">
          Empower Your Future with <HightlightText text={"Coding Skills"} />
        </div>
        <div className="text-center w-[90%] text-xl font-bold text-richblack-200 mt-4 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTABUTTON active={true} linkto={"/signup"}>
            Learn More
          </CTABUTTON>
          <CTABUTTON active={false} linkto={"/login"}>
            Book a Demo
          </CTABUTTON>
        </div>

        <div className="shadow-blue-200 mx-3 my-14">
            <video muted loop autoPlay>
                <source src={Banner} />
            </video>
        </div>
      </div>

      {/* section 2 */}

      {/* section 3 */}

      {/* footer */}
    </div>
  );
};
