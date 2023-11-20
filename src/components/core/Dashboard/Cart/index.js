import React from 'react'
import NavLocation from '../NavLocation'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {
    const { total, totalItem } = useSelector((state) => state.cart)

    return (
        <div className="text-richblack-5">
            <div className="flex gap-8 flex-col mb-14">
                <NavLocation />
                <h1 className="text-richblack-5 font-medium text-3xl leading-8">Cart</h1>
            </div>
            <p className='border-b w-full mt-2 border-richblack-600 pb-2'>  {totalItem} Courses in Cart</p>

            {
                total.length > 0 ?
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                    :
                    <p className="mt-14 text-center text-3xl text-richblack-100">
                        Your cart is empty
                    </p>
            }


        </div>


    )
}

export default Cart