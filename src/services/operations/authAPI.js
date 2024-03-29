import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice";
import apiconnector from "../apiconnector";
import { endpoints } from "../apis";
import { setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    LOGIN_API, SIGNUP_API,SENDOTP_API,RESETPASSTOKEN_API,RESETPASSWORD_API
} = endpoints

export const login = (email, password, navigate) => {
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
                console.log("INside error");
                toast.error(response.data.message)
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
           // (error.response.data.message) ? toast.error(error.response?.data?.message) :
            toast.error("Something went wrong , Please try again")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)


    }
}



export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
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
            toast.error(error.message)
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

export const getPasswordResetToken =  (email, setEmailSend)=> {
    return  async(dispatch)=> {
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true));

        try {
            const response = await apiconnector("POST", RESETPASSTOKEN_API , {
                email
            });
            if (!response) {
                throw new Error(response.data.message)
            }
            toast.success("Reset Email send")
            setEmailSend(true)
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const updatePassword = (oldPassword,newPassword , confirmNewPassword , token)=> {
    console.log("Inside Update Password");
    return async(dispatch)=> {
        dispatch(setLoading(true))
        const toastId = toast.loading(true)
        try {
            const response = await apiconnector("POST" , RESETPASSWORD_API, {
                oldPassword,
                newPassword , 
                confirmNewPassword ,
            } ,{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              })
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}