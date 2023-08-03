import React from "react";
import NavLocation from "../NavLocation";
import ProfileImage from "./ProfileImage";
import ProfileInformation from "./ProfileInformation";
import Password from "./Password";
import { useSelector } from "react-redux";

const Index = () => {
  const { user } = useSelector((state) => state.profile);
  
  return (
    <div className="flex gap-4 gap-y-8 flex-col ">
      <div className="flex flex-col gap-8">
        <NavLocation isNeed="true" />
        <h1 className="text-richblack-5 mb-18 text-3xl font-medium ">
          Edit Profile
        </h1>
      </div>
      <div className="flex gap-6 flex-col text-richblack-5">
          <ProfileImage userDetails={user} />
        <div className="mt-4">
          <ProfileInformation userDetails={user} />
        </div>
        <div className="mt-4">
          <Password />
        </div>
      </div>
    </div>
  );
};

export default Index;
