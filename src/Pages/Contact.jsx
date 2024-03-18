import React from "react";
import CountryCode from "../data/countrycode.json";
import Footer from "../components/comman/Footer";
import { CTABUTTON } from "../components/core/HomePages/Button";
import { IoIosChatboxes ,IoIosCall  } from "react-icons/io";
import { BiWorld } from "react-icons/bi";

// import Select from "react-select";

const Contact = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="mx-auto max-w-maxContent w-11/12 py-20">
        <div className="flex xl:flex-row  flex-col xl:gap-4  gap-8 items-start justify-center">
          <div className="xl:w-[40%] w-full flex rounded-lg flex-col  gap-1 bg-richblack-800">
            <div className="p-8 gap-4">
              <div className="flex gap-2 items-center ">
                <span className="text-[24px] text-richblack-200"><IoIosChatboxes />
                </span>
                <h1 className="text-richblack-5 font-semibold text-lg">
                  Chat on us
                </h1>
              </div>
              <div className="text-richblack-200  text-sm">
                <p className="font-medium">Our friendly team is here to help.</p >
                <p>info@studynotion.com</p>
              </div>
            </div>
            <div className="py-3 px-8 gap-4 text-richblack-200">
              <div className="flex gap-2 items-center ">
                <span className="text-[24px] text-richblack-200"><BiWorld />
                </span> 
                <h1 className="text-richblack-5 font-semibold text-lg">
                  Visit Us
                </h1>
              </div>
              <div className="text-richblack-200  text-sm">
                <p className="font-medium">Come and say hello at our office HQ.</p >
                <p className="font-semibold">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,Bangalore-560016</p>
              </div>
            </div>
            <div className="py-8 px-8 gap-4 text-richblack-200">
              <div className="flex gap-2 items-center ">
                <span className="text-[24px] text-richblack-200"><IoIosCall />
                </span> 
                <h1 className="text-richblack-5 font-semibold text-lg">
                  Call Us
                </h1>
              </div>
              <div className="text-richblack-200  text-sm">
                <p className="font-medium">Come and say hello at our office HQ.</p >
                <p className="font-semibold">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,Bangalore-560016</p>
              </div>
            </div>
          </div>
          <div className="xl:w-[60%] border w-full rounded-md border-richblack-500 p-14 xs:p-4">
            <div className="flex flex-col items-start justify-center gap-4">
              <h1 className="text-richblack-5 text-4xl xs:text-2xl font-semibold">
                Got a Idea? We've got the skills. Let's team up
              </h1>
              <p className="text-richblack-300 text-lg">
                Got a Idea? We've got the skills. Let's team up
              </p>
            </div>
            <div className="mt-10">
              <form
                onSubmit={handleOnSubmit}
                className="flex justify-between flex-col items-start gap-6"
              >
                <div className="flex flex-row xs:flex-col w-full  gap-5 lg:flex-row">
                  <div className="flex flex-col gap-2 xl:w-[48%] xs:w-full">
                    <label htmlFor="firstname" className="lable-style">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Enter first name"
                      className="form-style"
                    // {...register("firstname", { required: true })}
                    />
                    {/* {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )} */}
                  </div>
                  <div className="flex flex-col gap-2 xl:w-[48%] xs:w-full">
                    <label htmlFor="lastname" className="lable-style">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Enter last name"
                      className="form-style"
                    // {...register("lastname")}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="lable-style">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    className="form-style"
                  />
                </div>
                <div className="flex items-end justify-start ml-0 w-full gap-4 xs:gap-8 ">
                  <div className="flex gap-2 flex-col w-[20%]">
                    <label className="lable-style">Country</label>
                    <select
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Enter first name"
                      className="form-style w-20"
                    // {...register("countrycode", { required: true })}
                    >
                      {CountryCode.map((ele, i) => {
                        return (
                          <option key={i} value={ele.code}>
                            {ele.code} -{ele.country}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col w-[70%]">
                    <label className="lable-style">Mobile Number</label>
                    <input
                      type="number"
                      placeholder="Enter NUmber"
                      name="number"
                      className="form-style"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="message" className="lable-style">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="form-style"
                  // {...register("message", { required: true })}
                  />
                </div>
                <div className="w-full ">
                  <CTABUTTON active={true}>
                    <div className="flex flex-row items-center justify-center  gap-3 font-bold w-full">
                      Send Message
                    </div>
                  </CTABUTTON>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100px] xl:h-[30px]"></div>
      <Footer />



    </>
  );
};

export default Contact;
