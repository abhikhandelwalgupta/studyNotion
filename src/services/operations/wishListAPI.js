import toast from "react-hot-toast"
import apiconnector from "../apiconnector"
import { wishListEndPoints } from "../apis"

const {
    GET_USER_WISH_LIST_API,
    ADD_WISHLIST_API
} = wishListEndPoints

export const getUserWishList = async (token) => {
    const toastId = toast.loading('loading...')
    let result
    try {
        const response = await apiconnector("get", GET_USER_WISH_LIST_API, null, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log(response?.data?.wishListDetails[0]?.Courses);
        result = response?.data?.wishListDetails[0]?.Courses
    } catch (error) {
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
    return result
}


export const addWishList = async (token, coursesId) => {
    const toastId = toast.loading('loading...')
    let result
    try {
        const response = await apiconnector("POST", ADD_WISHLIST_API, { coursesId }, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        result = response?.data?.wishListAdd?.Courses

    } catch (error) {
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
    return result
}