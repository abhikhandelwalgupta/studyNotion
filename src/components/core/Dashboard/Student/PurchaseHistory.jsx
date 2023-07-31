import React from "react";
import { useLocation } from "react-router-dom";
import NavLocation from "./../NavLocation";

const PurchaseHistory = () => {
  return (
    <div className="text-richblack-5">
      <div className="flex gap-8 flex-col">
        <NavLocation />
        <h1 className="text-richblack-5 font-medium text-3xl leading-8">
          PurchaseHistory
        </h1>
      </div>
    </div>
  );
};

export default PurchaseHistory;
