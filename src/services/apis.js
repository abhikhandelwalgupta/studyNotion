const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);
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
export const courseEndpoints = {
  EDIT_COURSE_API: BASE_URL + "Course/editCourse",
  CREATE_COURSE_API: BASE_URL + "Course/createCourse",
  INSTRUCTOR_COURSE_API: BASE_URL + "course/getInstructorCourse",
  COURSE_SUB_SECTION_ADD: BASE_URL + "course/addSubSection",
  COURSE_GETCOURSEDETAILS: BASE_URL + "course/getCourseDetails",
  EDIT_COURSE: BASE_URL + "course/editCourse",
  EDIT_SUBSECTION: BASE_URL + "course/updateSubSection",
  COURSE_DELETE: BASE_URL + "course/deleteCourse",
  COURSE_CATEGORY_DETAILS: BASE_URL + "course/details"
}

//Section End-Point 

export const sectionEndPoints = {
  COURSE_SECTION_CREATE: BASE_URL + "course/addSection",
  COURSE_SECTION_UPDATE: BASE_URL + "course/updateMainSection",
  SECTION_DELETE: BASE_URL + "course/deleteSection"
}

export const subSectionsEndPoints = {
  COURSE_SUB_SECTION_ADD: BASE_URL + "course/addSubSection",
  EDIT_SUBSECTION: BASE_URL + "course/updateSubSection",
}


export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "course/getCategoryPageDetails",
}


// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "payment/sendPaymentSuccessEmail",
}