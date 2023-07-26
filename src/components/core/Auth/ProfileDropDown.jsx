import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import {VscDashboard, VscSignOut} from "react-icons/vsc"
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";


const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const [open , setOpen ] = useState(false)
  const ref = useRef(null);

  useOnClickOutside(ref, ()=> setOpen(false) )
  
 if(!user) return null
  return (
    <>
    <button className="relative cursor-pointer  " onClick={()=> setOpen(true)}>
      <div className="flex flex-row items-center justify-center">
        <img
          src={user?.image}
          alt=""
          className="bg-richblack-25 w-[30px] rounded-full object-cover aspect-square"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {
        open && (
          <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
           <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div  
          onClick= {()=> {
            dispatch(logout(navigate)) 
            setOpen(false)
          }} 
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
          <VscSignOut className="text-lg" />
            Logout
          </div>
          </div>
        )
      }
      </button>
      
    </>
  );
};

export default ProfileDropDown;
