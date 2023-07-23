import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HightlightText } from "../components/core/HomePages/HightlightText";
import { CTABUTTON } from "../components/core/HomePages/Button";
import Banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from "../components/core/HomePages/CodeBlocks";
import { TimelineSection } from "../components/core/HomePages/TimelineSection";
import { LearningLanguageSection } from "../components/core/HomePages/LearningLanguageSection"; 
import { Instructor } from "../components/core/HomePages/Instructor";
import { Review } from "../components/core/HomePages/Review";
import { ExploreMore } from "../components/core/HomePages/ExploreMore";
import Footer from "../components/comman/Footer";

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

        <div className="box-shadow-3d   shadow-blue-500/50   border-solid mx-8 my-[6rem]">
          <video muted loop autoPlay>
            <source src={Banner} />
          </video>
        </div>

        {/* code block section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row sm:flex-col"}
            codeblockStyle = {"codeblock1"}
            heading={
              <div className="text-4xl font-semibold">
                {" "}
                Unlock your {<HightlightText text={"coding potential"} />} with
                our online courses
              </div>
            }
            subheading={
              <div className="text-justify w-[90%] text-xl font-bold text-richblack-200 mt-1 ">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </div>
            }
            bgGradient={"shadow-yellow-700/95"}
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/sigUp",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
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
            codeblockStyle = {"codeblock2"}
            heading={
              <div className="text-4xl font-semibold">
                {" "}
                Start {<HightlightText text={"Coding in seconds"} />}{" "}
              </div>
            }
            subheading={
              <div className="text-justify w-[90%] text-xl font-bold text-richblack-200 mt-1 ">
                Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson..
              </div>
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/sigUp",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html > \n <html> \n <head><title>Example</title><link rel="stylesheet"href="styles.css"> \n </head>\n <body> \n <h1><a href="/">Header</a> \n </h1> \n <nav><a href="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
        </nav>`}
            bgGradient={"shadow-blue-700/95"}
            codeColor={"text-yellow-25"}
          />
        </div>

        <div className="mt-28">
          <ExploreMore/>
        </div>
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5  text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-between">
            <div className="h-[150px]"></div>
            <div className="flex text-white items-center w-full mt-8 justify-center mx-auto flex-row gap-7">
              <CTABUTTON active={true} linkto={"signup"}>
                <div className="flex flex-row items-center gap-3 font-bold">
                  Explore Full Catalog <BsArrowRightShort />
                </div>
              </CTABUTTON>
              <CTABUTTON active={false} linkto={"signup"}>
                <div className="flex flex-row items-center gap-3 font-bold">
                  Learn More
                </div>
              </CTABUTTON>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent  flex flex-col  items-center justify-between gap-6">
          <div className="mt-[110px]  flex flex-row mb-10 items-center justify-center gap-12">
            <div className="font-[600] w-[45%] text-4xl">
              Get the skills you need for a{" "}
              <HightlightText text={"job that is in demand"} />.
            </div>
            <div className="flex gap-8 flex-col w-[50%] items-start">
              <div className="font-inter text-[16px] font-[500]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTABUTTON active={true} linkto={"signup"}>
                <div className="font-bold">Learn More</div>
              </CTABUTTON>
            </div>
          </div>
          <TimelineSection/>
        <LearningLanguageSection />
        </div>

        
      </div>
      {/* section 3 */}
        <div className="bg-richblack-900 mx-auto max-w-maxContent w-11/12 flex flex-col first-letter  gap-28 mb-12 justify-betweenitems-center text-white">
          <Instructor/>
          <div className="">
            <h2 className="text-center font-semibold text-4xl">Reviews from other learners</h2>
          </div>
          <div className="flex flex-row gap-8 items-center justify-center" >
            <Review/>
            <Review/>
            <Review/>
          </div>
      </div>
      {/* footer */}
     
          <Footer/>
          
    </div>
  );
};
