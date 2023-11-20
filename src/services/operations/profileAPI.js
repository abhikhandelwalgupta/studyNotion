import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import { profileEndPoint } from "../apis";

const { GET_STUDENT_COURSES, GET_INSTRUCTOR_DATA_API } = profileEndPoint;

export async function getStudentEnrolledCourse(token, userId) {
    const toastId = toast.loading("course loading")
    let result = ''
    try {
        const response = await apiconnector("GET", GET_STUDENT_COURSES, { token }, {
            Authorization: `Bearer ${token}`,
        })

        result = response?.data?.data
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId)
    return result
}



export async function getInstructorData(token) {
    const toastId = toast.loading("course loading")
    let result = []
    try {
        const response = await apiconnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })
        result = response?.data?.courses
        console.log(result);
    } catch (error) {
        toast.dismiss(toastId)
        return result
    }
    toast.dismiss(toastId)
    console.log(result);
    return result
}