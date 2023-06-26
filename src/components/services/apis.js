const BASE_URL = process.env.REACT_APP_BASE_URL


export const categories = {
    CATEGORIES_API : BASE_URL + "course/showAllCategories"
}


export const endpoints = {
    SENDOTP_API : BASE_URL + "auth//sendotp",
    LOGIN_API : BASE_URL + 'auth/login',
    SIGNUP_API : BASE_URL + 'auth/signup',
    CHANGEPASSWORD_API : BASE_URL + 'auth/changepassword'
}


export const profileEndPoint = {
    DELETEPROFILE_API : BASE_URL+'profile/deleteProfile',
    GETUSERDETAIL_API : BASE_URL+'profile/getUserDetails',
    GETENROLLEDCOURSE_API :BASE_URL+'profile/getEnrolledCourses',
    
}


export const settingsEndpoints = {
    UPDATEDISPLAYPICTURE_API:BASE_URL+'profile/updateDisplayPicture',
    UPDATEPROFILE_API : BASE_URL+'profile/updateProfile',
}