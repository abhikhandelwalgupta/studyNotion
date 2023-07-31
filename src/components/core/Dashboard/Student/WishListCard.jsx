import React from 'react'

const WishListCard = ({image}) => {
  return (
   <>
    <div className="flex justify-between items-center px-4 py-4 border border-richblack-700  ">

            <div className=" rounded flex gap-4 shadow-md border-richblack-700">
                <div className="w-[20%]">
                <img src={image} alt="" className="w-full  rounded"  />
                </div>
                <div className=" w-[60%]">
                    <p className="text-lg font-medium">The Complete Python Bootcamp From Zero to Hero in Python</p>
                </div>
                <div className="flex flex-col gap-7">
                    <div >
                        <button>Remove</button>
                    </div>
                    <p className="text-yellow-50 text-2xl font-semibold">Rs. 1700</p>
                </div>
            </div>
        </div>
   </>
  )
}

export default WishListCard