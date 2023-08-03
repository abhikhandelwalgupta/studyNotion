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
  }, []);


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] bg-richblack-800 border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent my-auto mx-auto items-center  justify-between">
        <Link to="/">
          <img src={logo} alt="logo" loading="lazy" width={"160"} height={"42"} />
        </Link>
        {/* Nav link */}
        <nav className="text-richblack-100">
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
        <div className="flex gap-4 items-center text-richblack-100">
          {user && user?.accountType === "Student" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
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
      </div>
    </div>
  );
};

export default NavBar;
