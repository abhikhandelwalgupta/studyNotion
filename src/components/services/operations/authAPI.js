import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../../slices/profileSlice";
import apiconnector from "../apiconnector";
import { endpoints } from "../apis";
import { setToken } from "../../../slices/authSlice";

const {
    LOGIN_API
} = endpoints

export const login = (email, password, navigate) => {
    console.log(`login service called.. `);
    return async (dispatch) => {
        const toastId = toast.loading(true)
        dispatch(setLoading(true))

        if ((email === undefined && email === null) || (password === undefined && password === null)) {
            toast.error("Please enter email & password ")
            toast.dismiss(toastId)
            return;
        }

        try {
            const response = await apiconnector("POST", LOGIN_API, {
                email,
                password
            });

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        } catch (error) {
            toast.error("Something went wrong , Please try again")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)


    }
}

export const signUp = ()=> {
    
}