import React from "react";
import CountryCode from "../../data/countrycode.json";
// import Select from "react-select";

const Contact = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="mx-auto max-w-maxContent w-11/12 py-20">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-richblack-5 text-4xl font-semibold">
            Get in Touch
          </h1>
          <p className="text-richblack-300 text-lg">
            We'd love to here for you, Please fill out this form.
          </p>
        </div>
        <div className="mt-10">
          <form
            onSubmit={handleOnSubmit}
            className="flex justify-between flex-col items-center gap-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
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
              <div className="flex flex-col gap-2 lg:w-[48%]">
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
            <div className="flex items-end justify-start ml-0 w-full gap-4 ">
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
              <div className="flex flex-col w-[100%]">
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
        {/* {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )} */}
      </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
