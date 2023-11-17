/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineDoubleLeft } from "react-icons/ai";
import {FaPlay} from "react-icons/fa"




export const ViewCourseSideBar = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length)
        return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )
      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
      //set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //set current sub-section here
      setVideoBarActive(activeSubSectionId);
    }
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname])

  

  return (
    <div className="hidden lg:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">

      <div className='p-4 text-white flex gap-4 flex-row items-center'>
        <button title="Back" onClick={() => navigate("dashboard/enrolled-courses")}>
          <AiOutlineDoubleLeft />
        </button>
        <div className='flex flex-row gap-4'>
          <p>{courseEntireData?.courseName}</p>
          <p>{completedLectures?.length} / {totalNoOfLectures}</p>
        </div>
      </div>
      <div className="flex gap-3 flex-col mt-4 ">
        {

          courseSectionData.map((course, index) => (

            <div
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >

              <div className='flex items-center cursor-pointer justify-between py-3 px-4 w-full bg-richblack-700 border-white'>
                <h2 className='text-white   '>  {course?.sectionName}</h2>

                {
                  //AiOutlineCaretDown
                  activeStatus === course?._id ? ( <AiOutlineCaretDown className='text-white' />) :( <AiOutlineCaretUp className='text-white' />)
                }
               

              </div>
              {/* HW- add icon here and handle rotate 180 logic */}

              <div className='mt-1'>
                {
                  activeStatus === course?._id && (
                    <div>
                      {
                        course.subSection.map((topic, index) => (
                          <div
                            className={`flex gap-5 r items-center px-8 py-3 `}
                            key={index}
                          >
                            {
                              (videoBarActive === topic._id  ? ( <FaPlay className='text-richblue-200 cursor-pointe font-bold' />) : 
                           
                            <input
                            className='cursor-pointer'
                              type='checkbox'
                              checked={completedLectures.includes(topic?._id)}
                              onChange={() => { }}
                            />
                            ) }
                            <span
                             onClick={() => {
                              navigate(
                                `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                              )
                              setVideoBarActive(topic?._id);
                            }} 
                            className={`capitalize cursor-pointer ${videoBarActive === topic._id ? "text-richblue-200  font-bold" 
                            : "text-white"}`}
                            >
                              {topic.title}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}
