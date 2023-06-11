import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HightlightText } from "../components/core/HomePages/HightlightText";
import { CTABUTTON } from "../components/core/HomePages/Button";
import Banner from "../assets/Images/banner.mp4"
import { CodeBlocks } from "../components/core/HomePages/CodeBlocks";

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
          <CTABUTTON active={true} linkto={"/signup"} >
            Learn More
          </CTABUTTON>
          <CTABUTTON active={false} linkto={"/login"}>
            Book a Demo
          </CTABUTTON>
        </div>

        <div className="box-shadow-3d   shadow-blue-500/50   border-solid mx-8 my-[6rem]">
            <video muted loop autoPlay>
                <source src={Banner} />
            </video>
        </div>

        {/* code block section 1 */}
        <div>
          <CodeBlocks 
          position={"lg:flex-row sm:flex-col"} 
          heading={<div className="text-4xl font-semibold"> Unlock your {<HightlightText text={"coding potential"} />} with our online courses</div>} 
          
          subheading={<div className="text-justify w-[90%] text-xl font-bold text-richblack-200 mt-1 ">
          Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
        </div>}
        
         bgGradient={"shadow-yellow-700/95"}
        ctabtn1={{
          btnText :"Try it yourself",
          linkto :"/sigUp",
          active:true
        }}
        
        ctabtn2={{
          btnText :"Learn More",
          linkto :"/login",
          active:false
        }}
        
        codeblock={`<!DOCTYPE html > \n <html> \n <head><title>Example</title><link rel="stylesheet"href="styles.css"> \n </head>\n <body> \n <h1><a href="/">Header</a> \n </h1> \n <nav><a href="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
        </nav>`}

        codeColor={"text-yellow-25"}
        />
        </div>

        {/* code block section 2 */}

        <div>
          <CodeBlocks 
          position={"lg:flex-row-reverse"} 
          heading={<div className="text-4xl font-semibold"> Start   {<HightlightText text={"Coding in seconds"} />} </div>} 
          
          subheading={<div className="text-justify w-[90%] text-xl font-bold text-richblack-200 mt-1 ">
          Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson..
        </div>}
        
        ctabtn1={{
          btnText :"Continue Lesson",
          linkto :"/sigUp",
          active:true
        }}
        
        ctabtn2={{
          btnText :"Learn More",
          linkto :"/login",
          active:false
        }}
        
        codeblock={`<!DOCTYPE html > \n <html> \n <head><title>Example</title><link rel="stylesheet"href="styles.css"> \n </head>\n <body> \n <h1><a href="/">Header</a> \n </h1> \n <nav><a href="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
        </nav>`}

        bgGradient={"shadow-blue-700/95"}
        codeColor={"text-yellow-25"}
        />
        </div>
      </div>

      {/* section 2 */}

      {/* section 3 */}

      {/* footer */}
    </div>
  );
};
