import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ViewCourseSideBar } from '../components/core/ViewCourse/ViewCourseSideBar';
import { getEnrolledCourseDetails } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';


const ViewCourse = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation()
    const { courseId, sectionId, subSectionId } = useParams();
    const dispatch = useDispatch()


    if (!courseId && !sectionId && !subSectionId) {
        navigate("dashboard/enrolled-courses")
    }

    useEffect(() => {
        if (!token) return navigate("/login", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getResult = async () => {
            const courseData = await getEnrolledCourseDetails(courseId, token)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        getResult()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionId, subSectionId, location])

    return (

        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <ViewCourseSideBar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className=" py-4 mx-auto max-w-[80%] shadow-2xl bg-richblack-800 rounded-2xl mt-4 px-3 " >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ViewCourse