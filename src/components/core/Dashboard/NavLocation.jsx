import React from "react";
import { useLocation } from "react-router-dom";

const NavLocation = () => {
  // console.log(noEmptyStrings);
  const location = useLocation();
  console.log(location);
  const navLocations = location.pathname.split("/");
  console.log(navLocations[navLocations.length - 1]);
  const noEmptyStrings = navLocations.filter((str) => str !== "");
  return (
    <div className="flex gap-2">
      <p className="text-richblack-300">Home </p>
      {noEmptyStrings.map((navLocation, index) => {
        return (
          <div key={index} className="flex gap-4 cursor-pointer">
            {console.log(navLocation[navLocation.length - 1] === navLocation)}
            <span className="text-richblack-5">/</span>
            <span className={`${navLocations[navLocations.length - 1] === navLocation   ? "text-yellow-25" :"text-richblack-300" } capitalize`}>
              {navLocation.replace("-", " ")}{" "}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default NavLocation;
