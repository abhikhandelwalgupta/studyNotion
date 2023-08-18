import { categories, courseEndpoints } from "../apis";
import apiconnector from "../apiconnector";
import { toast } from "react-hot-toast";
const { CATEGORIES_API } = categories;
const { CREATE_COURSE_API, INSTRUCTOR_COURSE_API, COURSE_SECTION_CREATE } =
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
  let result = null;
  const toastId = toast.loading("loading...");
  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log(response?.data);
    if (!response.data.data) {
      throw new Error("Something Went wrong...");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log(error);
    toast.error(error);
  }

  toast.dismiss(toastId);
  return result;
};

export const getInstructorCourse = async (token) => {
  const toastId = toast.loading("loading...");
  let result = "";
  try {
    const response = await apiconnector("POST", INSTRUCTOR_COURSE_API, null, {
      Authorization: `Bearer ${token}`,
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

    if (!response.data.updatedCourseDetails) {
      throw new Error("Please Try again");
    }
    toast.success("Section created...");
    result = response?.data?.updatedCourseDetails;
  } catch (e) {
    toast.error("Something went wrong...");
  }
  toast.dismiss(toastId);
  return result;
};

export const courseDelete = async (courseId) => {
  const toastId = toast.loading("loading...");
  try {
    const response = apiconnector("POST")
  } catch (e) {
    toast.error("Something went wrong. Please try again.");
  }
  toast.dismiss(toastId);
};
