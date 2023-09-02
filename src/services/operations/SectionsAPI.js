import { toast } from "react-hot-toast";
import apiconnector from "../apiconnector";
import { sectionEndPoints } from "../apis";

const {

    COURSE_SECTION_CREATE,
    COURSE_SECTION_UPDATE,
    SECTION_DELETE

} = sectionEndPoints;


export const createSection = async (FormData, token) => {
    const toastId = toast.loading("loading...");
    let result = null;
    try {
        const response = await apiconnector(
            "POST",
            COURSE_SECTION_CREATE,
            FormData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.updatedCourseDetails) {
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.updatedCourseDetails;
    } catch (e) {
        toast.error(e?.message);
    }
    toast.dismiss(toastId);
    return result;
};



export const updateMainSection = async (formData, token) => {
    const toastId = toast.loading("loading...")
    let result = ""
    try {
        const response = await apiconnector("put", COURSE_SECTION_UPDATE, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        if (!response.data?.data) {
            toast.error(response.data?.message)
        }


        result = response.data?.data

    } catch (e) {
        toast.error("Something went while updating...")
    }
    toast.dismiss(toastId)
    return result
}


export const deleteSection = async (formData, token) => {
    const toastId = toast.loading("loading...")
    let result;
    try {
        const response = await apiconnector("delete", SECTION_DELETE, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        if(!response.data?.data) {
            throw  new Error('something went wrong')
        }

        console.log(response.data?.data);
        result = response.data?.data;

    } catch (error) {
        toast.error(error.message)
    }
    
    toast.dismiss(toastId)
    return result
}