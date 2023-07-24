import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  
  const [open , setOpen ] = useState(false)
  //aspect-square w-[30px]
  return (
    <>
    <button className="cursor-pointer">
      <div className="flex flex-row">
        <img
          src={user?.image}
          alt=""
          className="bg-richblack-25 w-[30px] rounded-full object-cover aspect-square"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      </button>
    </>
  );
};

export default ProfileDropDown;
