import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import * as AiIcon from "react-icons/ai"
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { resetCourseState } from "../../../slices/courseSlice"

const SideBarLinks = ({ link }) => {
  
  let Icon = link.iconType === "ai"  ? AiIcon[link.icon] :Icons[link.icon]
  const location = useLocation();
  const dispatch =  useDispatch();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      onClick={()=>dispatch(resetCourseState())}
      className={` relative  ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200 w-[100%]`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center  gap-x-2 ml-4 p-2">
        <Icon className="text-xl" />
        {link.name}
      </div>
    </NavLink>
  );
};

export default SideBarLinks;
