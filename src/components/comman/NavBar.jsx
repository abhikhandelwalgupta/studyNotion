import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import apiconnector from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";

// const subLinks1 = [
//   {
//     title: "python",
//     link: "/catalog/python",
//   },
//   {
//     title: "web dev",
//     link: "/catalog/web-development",
//   },
// ];
const NavBar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [open, setOpen] = React.useState(false);



  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        const result = await apiconnector("GET", categories.CATEGORIES_API);
        //setSubLinks(result.data?.categoryDetails);
        setSubLinks(result?.data?.categoryDetails);


      } catch (error) {
        console.log("Could not fetch the category");
      }
    };
    fetchSubLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] bg-richblack-800 border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent my-auto mx-auto items-center  justify-between">
        <Link to="/">
          <img src={logo} alt="logo" loading="lazy" className="w-[160px] h-[42px] object-contain" />
        </Link>
        {/* Nav link */}
        <div className="-mr-2 -my-2 hidden xs:inline-block">
          <button
            type="button"
            className="bg-richblack-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open menu</span>
            {/* Heroicon name: outline/menu */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className="text-richblack-100 xs:hidden">
          <ul className="flex gap-4">
            {NavbarLinks.map((link, index) => {
              return link.title === "Catalog" ? (
                <div
                  key={index}
                  className="relative cursor-pointer flex items-center gap-1 group"
                >
                  <p>{link.title}</p>
                  <IoIosArrowDropdownCircle />
                  <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] ">
                    <div
                      className="absolute left-[50%] top-0
                                translate-x-[0%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                    ></div>
                    {subLinks?.length ? (

                      subLinks.map((subLink, index) => (

                        <Link
                          to={`/catalog/${subLink.Name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          key={index}
                          className="hover:bg-richblack-50 rounded-lg pl-2 my-1"
                        >
                          <p className="py-2 font-inter">{subLink.Name}</p>
                        </Link>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={link.path} key={index}>
                  {" "}
                  <p
                    className={
                      matchRoute(link?.path)
                        ? "text-yellow-200"
                        : "text-richblack-100"
                    }
                  >
                    {link.title}
                  </p>
                </Link>
              );
            })}
          </ul>
        </nav>
        {/* Login/Signup/Dashboard */}
        <div className="flex gap-4 items-center text-richblack-100 xs:hidden">
          {user && user?.accountType === "Student" && (
            <Link to="/dashboard/cart" className="relative">
              <span className="flex"><AiOutlineShoppingCart className={`${totalItem > 0 ? "text-3xl" : "text-xl"} `} /></span>
              {totalItem > 0 && <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                {totalItem}
              </span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md shadow-md">
                Log in{" "}
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded shadow-md">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>

        <div
          className={
            open
              ? "opacity-100 scale-100  ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              : "opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-richblack-600   divide-y-2 divide-gray-50 h-full">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                {/* <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div> */}
                <Link to="/">
                  <img src={logo} alt="logo" loading="lazy" className="w-[160px] h-[42px] object-contain" />
                </Link>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-richblack-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="-mt-10">
                <ul className="flex flex-col items-center justify-center gap-4 z-50 min-h-[50vh]">
                  {NavbarLinks.map((link, index) => {
                    return link.title === "Catalog" ? (
                      <div
                        key={index}
                        className="relative cursor-pointer flex items-center gap-1 group"
                      >
                        <p>{link.title}</p>
                        <IoIosArrowDropdownCircle />
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] ">
                          <div
                            className="absolute left-[50%] top-0
                                translate-x-[0%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                          ></div>
                          {subLinks?.length ? (

                            subLinks.map((subLink, index) => (

                              <Link
                                to={`/catalog/${subLink.Name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={index}
                                className="hover:bg-richblack-50 rounded-lg pl-2 my-1"
                              >
                                <p className="py-2 font-inter">{subLink.Name}</p>
                              </Link>
                            ))
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link to={link.path} key={index}>
                        {" "}
                        <p
                          className={
                            matchRoute(link?.path)
                              ? "text-yellow-200"
                              : "text-richblack-100"
                          }
                        >
                          {link.title}
                        </p>
                      </Link>
                    );
                  })}
                </ul>
                <div className="flex gap-4 items-center text-richblack-100 flex-col w-full">
                  {token === null && (
                    <>
                    <Link to="/login" className="w-full text-center py-2 bg-richblack-800 rounded-2xl" >
                      <button className="text-center px-[12px] py-[8px] rounded-md shadow-md ">
                        Log in{" "}
                      </button>
                    </Link>
                    <Link to="/signup" className="w-full text-center py-2 bg-richblack-800 rounded-2xl">
                      <button className=" bg-richblack-800 px-[12px] py-[8px] rounded shadow-md">
                        Sign up
                      </button>
                    </Link>
                    </>
                  )}
                </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
