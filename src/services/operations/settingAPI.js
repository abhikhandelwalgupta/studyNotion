import apiconnector from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice"
import { toast } from "react-hot-toast";


const { UPDATEDISPLAYPICTURE_API ,UPDATEPROFILE_API } = settingsEndpoints;

export const uploadImage = (formData, token) => {
 

  const toastId = toast.loading("Loading...")
  return async (dispatch) => {
    try {
      const response =await apiconnector("put", UPDATEDISPLAYPICTURE_API, 
        formData,
        {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
      );
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
      console.log(response);
    } catch (error) {}
    toast.dismiss(toastId)
  };
};


export const updateProfile = (token , data)=> {
  const toastId = toast.loading("Loading...")
  return async (dispatch) => {
    try {
      const response =await apiconnector("put" , UPDATEPROFILE_API , data , {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })

      if(!response?.data.success) {
        throw new Error(response.data.message)
      }
      console.log(response);
      toast.success("Profile Updated..")
      dispatch(setUser({ ...response.data.userDetils, ...response.data.profileDetails }))
    } catch (error) {
      
    }
    toast.dismiss(toastId)
  }
}


