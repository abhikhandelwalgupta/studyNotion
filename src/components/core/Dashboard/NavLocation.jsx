import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
const NavLocation = ({ isNeed }) => {
  const location = useLocation();
  const navLocations = location.pathname.split("/");
  const noEmptyStrings = navLocations.filter((str) => str !== "");
  return (
    <div className="flex gap-2">
      {isNeed ? (
        <div className="flex gap-1 items-center text-richblack-300 text-xl cursor-pointer">
          <AiOutlineArrowLeft />
          <span className="text-xl">Back</span>
        </div>
      ) : (
        <>
          <p className="text-richblack-300">Home </p>
          {noEmptyStrings.map((navLocation, index) => {
            return (
              <div key={index} className="flex gap-4 cursor-pointer">
                <span className="text-richblack-5">/</span>
                <span
                  className={`${navLocations[navLocations.length - 1] === navLocation
                      ? "text-yellow-25"
                      : "text-richblack-300"
                    } capitalize`}
                >
                  {navLocation.replace("-", " ")}{" "}
                </span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default NavLocation;
