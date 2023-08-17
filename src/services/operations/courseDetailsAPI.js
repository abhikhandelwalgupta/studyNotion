import { categories, courseEndpoints } from "../apis";
import apiconnector from "../apiconnector";
import { toast } from "react-hot-toast";
const { CATEGORIES_API } = categories;
const {  CREATE_COURSE_API, INSTRUCTOR_COURSE_API } =
  courseEndpoints;

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiconnector("GET", CATEGORIES_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.categoryDetails;
  } catch (error) {
    toast.error(error.message);
  }
  return result;
};

export const editCourseDetails = async (formData, token) => {
  const toastId = toast.loading("loading...");
  try {
  } catch (error) {
    toast.error(error);
  }
  toast.dismiss(toastId);
};

export const addCourseDetails = async (formData, token) => {
 // let result = null;
  const toastId = toast.loading("loading...");
  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log(response);
    console.log(`Form-Data ${JSON.stringify(formData)}`);
  } catch (error) {
    console.log(error);
    toast.error(error);
  }

  toast.dismiss(toastId);
  return "dd-test";
};

export const getInstructorCourse = async (token) => {
  console.log(token);
  const toastId = toast.loading("loading...");
  let result = "";
  try {
    const response =await apiconnector("POST", INSTRUCTOR_COURSE_API,null,{
      Authorization: `Bearer ${token}`
    });

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course");
    }
    result = response?.data?.result;
  } catch (e) {
    toast.error("Something went wrong...");
  }
  toast.dismiss(toastId);
  return result;
};
