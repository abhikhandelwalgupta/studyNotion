const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
  CATEGORIES_API: BASE_URL + "course/showAllCategories",
};

export const endpoints = {
  SENDOTP_API: BASE_URL + "auth//sendotp",
  LOGIN_API: BASE_URL + "auth/login",
  SIGNUP_API: BASE_URL + "auth/signup",
  CHANGEPASSWORD_API: BASE_URL + "auth/changepassword",
  RESETPASSTOKEN_API: BASE_URL + "auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "auth/reset-password",
};

export const profileEndPoint = {
  DELETEPROFILE_API: BASE_URL + "profile/deleteProfile",
  GETUSERDETAIL_API: BASE_URL + "profile/getUserDetails",
  GETENROLLEDCOURSE_API: BASE_URL + "profile/getEnrolledCourses",
};

export const settingsEndpoints = {
  UPDATEDISPLAYPICTURE_API: BASE_URL + "profile/updateDisplayPicture",
  UPDATEPROFILE_API: BASE_URL + "profile/updateProfile",
};


//Course EndPoint 
export const courseEndpoints ={
  EDIT_COURSE_API : BASE_URL + "Course/editCourse",
  CREATE_COURSE_API : BASE_URL + "Course/createCourse",
  INSTRUCTOR_COURSE_API : BASE_URL+"course/getInstructorCourse",
  COURSE_SECTION_CREATE : BASE_URL+"course/addSection"
 }