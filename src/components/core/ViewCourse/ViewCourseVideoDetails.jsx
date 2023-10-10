import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ViewCourseVideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);

 

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length)
        return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      }
      else {

        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        const filteredVideoData = filteredData?.[0].subsection.filter(
          (data) => data._id === subSectionId
        )

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);

      }
    }
    setVideoSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, location.pathname, courseEntireData])
  return (
    <div className='text-white'>ViewCourseVideoDetails</div>
  )
}

export default ViewCourseVideoDetails