import React from "react";
import * as Icons from "react-icons/vsc";
import {sidebarLinks} from "../../../data/dashboard-links"
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] text-white  min-w-[220px] bg-richblack-800">
      {
        sidebarLinks.map((links)=> {
            let Icon = Icons[links.icon]
          
            return (
             <Link to={links.path} className="flex items-center gap-1 ml-4"> <Icon className="text-xl"/>  <h1 className="text-richblack-5 p-2 ml-1" key={links.id}>{links.name}</h1></Link >
            )
        })
      }
    </div>
  );
};

export default SideBar;
