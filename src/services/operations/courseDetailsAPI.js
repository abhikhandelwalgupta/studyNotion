import { categories, courseEndpoints } from "../apis";
import apiconnector from "../apiconnector";
import { toast } from "react-hot-toast";
const { CATEGORIES_API } = categories;

const {
  CREATE_COURSE_API,
  INSTRUCTOR_COURSE_API,
  COURSE_GETCOURSEDETAILS,
  EDIT_COURSE,
  COURSE_DELETE,
  COURSE_CATEGORY_DETAILS
} = courseEndpoints;

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
  let result = null;
  try {
    const response = await apiconnector("PUT", EDIT_COURSE, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    if (!response.data?.CourseUpdate) {
      throw new Error("Course not updated");
    }

    result = response.data?.CourseUpdate
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
  toast.dismiss(toastId);
  return result;
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


export const courseDelete = async (courseId) => {
  const toastId = toast.loading("loading...");
  try {
    const response = apiconnector("POST")
    console.log(response);
  } catch (e) {
    toast.error("Something went wrong. Please try again.");
  }
  toast.dismiss(toastId);
};





export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("loading...")
  let result = null

  try {

    const response = await apiconnector("POST", COURSE_GETCOURSEDETAILS, { courseId }, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.data) {
      throw new Error("Course details not getting ")
    }
    result = response?.data?.data
  } catch (error) {
    console.log(error);
    toast.error("Course Details are not getting")
  }
  toast.dismiss(toastId)
  return result
}




export const CourseDelete = async (courseId, token) => {
  const toastId = toast.loading("loading...")
  try {
    let courseIdt = { "courseId": courseId }
    const response = await apiconnector("delete", COURSE_DELETE, courseIdt, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log(response);
  } catch (error) {
    toast.error("Something went wrong")
    console.log(error.message);
  }
  toast.dismiss(toastId)

}

export const getCategoryDetails = async () => {
  const toastId = toast.loading("loading...")
  try {
    console.log(COURSE_CATEGORY_DETAILS);
  } catch (error) {
    console.log(error.message);
    toast.error(error?.message)
  }

  toast.dismiss(toastId)
}