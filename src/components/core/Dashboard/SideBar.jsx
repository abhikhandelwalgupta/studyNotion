import React from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useNavigate } from "react-router-dom";
import SideBarLinks from "./SideBarLinks";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";


const SideBar = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="hidden md:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
      <div className="flex gap-3 flex-col mt-4 ">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return <SideBarLinks link={link} key={link.id} />;
        })}
      </div>
      <div className="mt-8 border-t-[1.5px] px-3 mx-4 border-richblack-600"></div>
      <div className="flex gap-3 mt-4 flex-col ">
        <SideBarLinks
          link={{
            name: "Setting",
            path: "/dashboard/settings",
            icon: "VscSettingsGear",
          }}
        />
        <button
          className="flex text-richblack-300 items-center  gap-x-2 ml-4 p-2"
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
