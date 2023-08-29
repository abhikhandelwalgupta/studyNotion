import React from "react";

const IconBtn = ({
  name,
  onclick,
  children,
  outline = false,
  customClasses,
}) => {
  return (
    <button
      className={`bg-yellow-50 py-2 px-4 rounded-md flex md:mt-0 mt-8 ${
        outline ? "border border-yellow-50 bg-transparent text-richblack-900 " : "bg-yellow-50 "
      } gap-2 items-center capitalize cursor-pointer gap-x-2  px-5 font-semibold text-richblack-900  ${customClasses}`}
      onClick={onclick}
    >
      {children ? (
        <>
          <span  className={`${outline && "text-yellow-50"}`}>{name}</span>
          {children}
        </>
      ) : (
        { name }
      )}
    </button>
  );
};

export default IconBtn;
