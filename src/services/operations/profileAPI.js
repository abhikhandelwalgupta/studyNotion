import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import { profileEndPoint } from "../apis";

const { GET_STUDENT_COURSES } = profileEndPoint;

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