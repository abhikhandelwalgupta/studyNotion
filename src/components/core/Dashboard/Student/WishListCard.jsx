import React from 'react'
import IconBtn from '../../../comman/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../../../utils/constants';
import toast from 'react-hot-toast';
import { addToCart } from '../../../../slices/cartSlice';

const WishListCard = ({ image, course, removeFromWish }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {
            dispatch(addToCart(course))
            return
        }

    }
    return (
        <>
            <div className="flex justify-between items-center w-full px-4 py-4 border border-richblack-700  ">
                <div className="rounded flex gap-4  w-full shadow-md border-richblack-700">
                    <div className='flex gap-4 w-[70%]'>

                        <img src={course?.thumbnail} alt="" className="h-[130px] w-[150px]  rounded" />

                        <div className="flex flex-col gap-3 w-[60%]">
                            <p className="text-lg font-medium">{course?.courseName}</p>
                            <p className='text-richblack-500'>{course?.courseDescription?.slice(0, 50)}</p>
                        </div>
                    </div>
                    <div className="flex w-[30%] flex-col gap-7">
                        <p className="text-yellow-50 text-center text-2xl font-semibold">Price : {course?.price}</p>
                        <div className='flex gap-3'>
                            <IconBtn name={"Remove"} onclick={() => removeFromWish(course._id)} />
                            <IconBtn name={"Move to cart"}  onclick={() => handleAddToCart()} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishListCard