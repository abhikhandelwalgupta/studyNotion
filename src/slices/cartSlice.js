import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
// import { toast } from "react-hot-toast";


const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalItem : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) :0
}


const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers : {
        addToCart : (state , actions)=> {
            const course = actions.payload
            const index = state.cart.findIndex((item)=> item._id === course._id)
           
            if(index >= 0) {
                toast.error("Course already in cart")
                return
            }
            state.cart.push(course)
            
            state.totalItem++
            state.total +=course.price

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItem))
            toast.success("Course added to cart")
        },
        removeFromCart : (state , actions)=> {
            const courseID = actions.courseID
            const index = state.cart.findIndex((item)=> item._id === courseID)

            if(index > 0) {
                state.totalItem--;
                state.total -= state.cart[index].price
                state.cart.splice(index ,1)

                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },
        resetCart : (state)=> {
            state.cart = []
            state.totalItem =0
            state.total = 0

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer;