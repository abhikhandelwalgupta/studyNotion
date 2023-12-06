import React from "react";
import wishlistImage from "../../../../assets/Images/wishlistImage.jpg";
import WishListCard from "./WishListCard";
import NavLocation from "./../NavLocation";
import { useEffect } from "react";
import { addWishList, getUserWishList } from "../../../../services/operations/wishListAPI";
import { useSelector } from "react-redux";
import { useState } from "react";

const WishList = () => {

  const { token } = useSelector((state) => state.auth)
  const [wishlist, setWishList] = useState([])

  const fetchWishList = async () => {
    const result = await getUserWishList(token)
    setWishList(result)
  }
  useEffect(() => {
    fetchWishList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeFromWish = async (courseID) => {
    const result = await addWishList(token, courseID)
    setWishList(result)
    console.log(result);
  }

  return (
    <div className="flex w-full flex-col  text-richblack-5">
      <div className="flex flex-col gap-8 pb-4 border-b border-b-richblack-700 ">
        <div className="flex flex-col gap-8">
          <NavLocation />
          <h1 className="text-richblack-5 font-medium text-3xl leading-8">
            My Wishlist
          </h1>
        </div>

        <p className="text-richblack-300 ">{wishlist?.length} Courses in Wishlist</p>
      </div>
      <div className="flex w-full gap-6">
        <div className="flex w-full flex-col gap-4">
          {
            wishlist?.map((course, i) => (
              <div key={i}>
                <WishListCard image={wishlistImage} course={course} removeFromWish={removeFromWish} />

              </div>
            ))
          }
        </div>
        
      </div>
    </div>
  );
};

export default WishList;
