import { toast } from "react-hot-toast";
import { subSectionsEndPoints } from "../apis";
import apiconnector from "../apiconnector";


const {
    EDIT_SUBSECTION,
    COURSE_SUB_SECTION_ADD,
} = subSectionsEndPoints


export const createSubSection = async (formData, token) => {
    const toastId = toast.loading("loading...")
    //addSubSection
    let result
    try {
      const response = await apiconnector("POST", COURSE_SUB_SECTION_ADD, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.updatesection
      //.log(`Respnse sub section creation :- `, JSON.stringify(response?.data?.updatesection));
  
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      // toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


export const updateSubSection = async (formData, token) => {
    const toastId = toast.loading("loading...")
    let result = null;
    try {
        const response = await apiconnector("put", EDIT_SUBSECTION, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        if (!response.data?.updateResult) {
            toast.error("Something went wrong while updating...")
        }

        result = response.data?.updateResult

        console.log(`In side updateSubsection :- `, response);
    } catch (error) {
        toast.error("Something went wrong while updating...")
    }

    toast.dismiss(toastId)
    return result
}

