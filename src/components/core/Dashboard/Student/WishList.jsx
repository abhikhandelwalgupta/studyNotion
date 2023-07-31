import React from "react";
import wishlistImage from "../../../../assets/Images/wishlistImage.jpg";
import WishListCard from "./WishListCard";
import NavLocation from "./../NavLocation";
const WishList = () => {
  return (
    <div className="flex w-full flex-col gap-10 text-richblack-5">
      <div className="flex flex-col gap-8 pb-4 border-b border-b-richblack-700 ">
        <div className="flex flex-col gap-8">
          <NavLocation />
          <h1 className="text-richblack-5 font-medium text-3xl leading-8">
            My Wishlist
          </h1>
        </div>

        <p className="text-richblack-300 ">3 Courses in Wishlist</p>
      </div>
      <div className="flex w-[80%] gap-6">
        <div className="flex flex-col gap-4">
          <WishListCard image={wishlistImage} />
          <WishListCard image={wishlistImage} />
          <WishListCard image={wishlistImage} />
        </div>
        <div>Total Cart</div>
      </div>
    </div>
  );
};

export default WishList;
