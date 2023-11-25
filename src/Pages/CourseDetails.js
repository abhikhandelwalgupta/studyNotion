import React, { useEffect, useState } from "react";
import CourseCardDetails from "../components/core/Catalog/CourseCardDetails";
import { useNavigate, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { formatDate } from "../services/formatDate";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Footer from "../components/comman/Footer";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import ConfirmationModal from "../components/comman/ConfirmationModal"

const CourseDetails = () => {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [response, setResponse] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [totalVideoLength, SetTotalVideoLength] = useState(0)
    const [isActive, setIsActive] = useState(Array(0))


    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id)
        )
    }

    useEffect(() => {
        (async () => {
            const res = await getFullDetailsOfCourse(courseId);
            setResponse(res);
        })();
    }, [courseId]);

    useEffect(() => {
        let lectures = 0;
        response?.data.courseContent.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures)
    }, [response])

    useEffect(() => {
        let totalDuration = 0;
        response?.data.courseContent.forEach((sec) => {
            totalDuration += sec.subSection?.timeDuration || 0
        })
        SetTotalVideoLength(totalDuration)
    }, [response])

    if (!response) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!response.success) {
        return <Error />
    }

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })g
    }

    const {
        courseName = "",
        courseDescription,
        whatYouWillLearn,
        instructor,
        createAt,
        courseContent,

    } = response?.data;




    return (
        <>
            <div className="relative w-full  bg-richblack-800">
                {/* Hero Section */}
                <div className="w-full box-content mx-auto  min-h-[450px]">
                    <div className=" flex w-11/12 max-w-maxContent my-auto mx-auto items-center py-20 justify-between">
                        <div className="flex flex-col justify-center gap-4 py-5  text-white">
                            <h1 className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                                {courseName}
                            </h1>
                            <p className="text-richblack-200 w-[50%] text-start leading-relaxed"> {courseDescription}</p>
                            <p className="text-richblack-5 capitalize">
                                {" "}
                                Created By {instructor?.firstName} {instructor?.lastName}
                            </p>
                            <p>Created at {formatDate(createAt)} English</p>
                        </div>
                        <div className="right-[8rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                            <CourseCardDetails course={response} handleBuyCourse={handleBuyCourse} setConfirmationModal={setConfirmationModal} />
                        </div>
                    </div>
                </div>
            </div>
            {/* section 2 */}
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mt-16 mx-auto max-w-maxContent lg:mx-0 xl:max-w-[810px]">
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What you'll learn</p>
                        <div className="mt-5">
                            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 3 */}
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mt-4 mx-auto max-w-maxContent lg:mx-0 xl:max-w-[810px]">
                    <div className="my-8  px-8">
                        <p className="text-3xl font-semibold">Course Content</p>
                        <div className="flex justify-between mt-5">
                            <div className="flex gap-3">
                                <span>{courseContent.length} section(s)</span>
                                <span>{totalNoOfLectures} lecture(s)</span>
                                <span>{totalVideoLength} total length</span>
                            </div>
                            <div>
                                <button className="text-yellow-25 cursor-pointer">Collapse all section</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Details Accordion */}
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mt-4 mx-auto max-w-maxContent lg:mx-0 xl:max-w-[810px]">
                    {
                        courseContent?.map((course, index) => {
                            return (
                                <CourseAccordionBar
                                    key={index}
                                    handleActive={handleActive}
                                    isActive={isActive}
                                    course={course}
                                />
                            )
                        })
                    }

                </div>
            </div>

            {/* author */}
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mt-16 mb-20 mx-auto max-w-maxContent lg:mx-0 xl:max-w-[810px]">
                    <h2 className="p-2 text-[28px] font-bold">Author</h2>
                    <div className="flex py-4 gap-4 items-center">
                        <img src={instructor?.image} alt="" className="w-14 h-14 object-cover rounded-full" />
                        <p className="capitalize text-lg">{instructor?.firstName}  {instructor?.lastName}</p>
                    </div>
                    <p>
                        {instructor?.profile?.about}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <Footer />
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    );
};

export default CourseDetails;
