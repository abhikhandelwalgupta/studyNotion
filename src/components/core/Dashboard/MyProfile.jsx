import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../comman/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import NavLocation from "./NavLocation";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  
  console.log(`user.Profile ${ user && JSON.stringify(user.Profile)}`);
  return (
    <>
      <div className="flex gap-4 gap-y-8 flex-col ">
      <div className="flex flex-col gap-4">
       <NavLocation  />
       <h1 className="text-richblack-5 mb-18 text-3xl font-medium ">
          My Profile
        </h1>
      </div>
        
        {/* Heading */}
        <div className="bg-richblack-800 py-8 mt-8 shadow-lg rounded-xl border-[1px]  border-richblack-700  px-6">
          <div className="flex items-start md:flex-row flex-col md:gap-0 gap-y-4   justify-between px-8">
            <div className="flex gap-4 items-center ">
              {user && (
                <>
                  <img
                    src={user.image}
                    className="rounded-full md:w-[100px] md:h-[100px] w-[50px] h-[50px]"
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-richblack-5 font-medium capitalize">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-richblack-300 md:text-lg text-xs">{user.email}</p>
                  </div>
                </>
              )}
            </div>
            <IconBtn
              className="text-richblack-25 "
              name="edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <RiEditBoxLine className="text-black" />
            </IconBtn>
          </div>
        </div>
        {/* about */}
        <div className="mt-8 py-8 px-6 bg-richblack-800 border rounded-xl border-richblack-700">
          <div className="flex justify-between md:flex-row flex-col mx-6 items-start ">
            <div className="flex flex-col gap-8">
              <h2 className="text-richblack-5 font-bold text-lg">About</h2>
              <p className="text-richblack-300 text-lg">
                {user && user.Profile
                  ? user.Profile.about && user.Profile.about
                  : "Write Something about youself"}
              </p>
            </div>
            <IconBtn
              name={"edit"}
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>
        {/* Profile */}
        <div className="bg-richblack-800 py-8 mt-8 px-6 border rounded-xl border-richblack-700">
          <div className="flex items-start justify-between px-8">
            <div className="flex gap-12 flex-col ">
              <h2 className="text-xl font-bold text-richblack-5">
                Personal Details
              </h2>
              <div className="flex justify-between flex-col gap-10 mt-4 w-[500px]">
                <div className="flex justify-between w-full">
                  <div className="flex gap-2 capitalize flex-col">
                    <p className="text-richblack-600">First Name</p>
                    <p className="text-richblack-5">{user && user.firstName}</p>
                  </div>
                  <div className="flex gap-2 capitalize flex-col">
                    <p className="text-richblack-600">Last Name</p>
                    <p className="text-richblack-5">{user && user.lastName}</p>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex gap-2 capitalize flex-col">
                    <p className="text-richblack-600">Email</p>
                    <p className="text-richblack-5">{user && user.firstName}</p>
                  </div>
                  <div className="flex gap-2 capitalize flex-col">
                    <p className="text-richblack-600">Phone Number</p>
                    <p className="text-richblack-5">{user && user.lastName}</p>
                  </div>
                </div>
              </div>
            </div>
            <IconBtn name={"Edit"}>
              <RiEditBoxLine className="text-black" />
            </IconBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
