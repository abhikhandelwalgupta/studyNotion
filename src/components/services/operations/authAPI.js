import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../../slices/profileSlice";
import apiconnector from "../apiconnector";
import { endpoints } from "../apis";
import { setToken } from "../../../slices/authSlice";

const {
    LOGIN_API, SIGNUP_API,SENDOTP_API
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

export const signUp = (accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        console.log(`This is inside fronted signUp :- ${accountType} , ${firstName} , ${lastName} , ${email} , ${password} , ${confirmPassword} ,${otp}`);
        try {
            const response = await apiconnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE............", response.data)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")

        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const sendOtp = (email,navigate)=> {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiconnector("POST", SENDOTP_API, {
            email,
            checkUserPresent: true,
          })
        
          console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    }catch(error) {
        console.log("Send OTP error");
        toast.error("Could Not Send Otp ")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}