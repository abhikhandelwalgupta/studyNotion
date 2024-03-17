import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import IconBtn from '../../comman/IconBtn';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';

const ViewCourseVideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)
  const { token } = useSelector((state) => state.auth)
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const playerRef = useRef();
  const [loading, setLoading] = useState(false);

  const setVideoSpecificDetails = async () => {

    if (!courseSectionData?.length)
      return;
    if (!courseId && !sectionId && !subSectionId) {
      navigate("/dashboard/enrolled-courses");
    }
    else {
      try {

        let filteredData = [] 
        filteredData = await courseSectionData.filter(
          (course) => course._id === sectionId
        )

        let filteredVideoData = []
        console.log(filteredData);
        filteredVideoData = await filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
      catch (erro) {
        alert(`please wait...` )
      }
    }
  }

  useEffect(() => {

    setVideoSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, location.pathname, courseEntireData])

  const handleLectureCompletion = async () => {

    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);

    setTimeout(() => {
      setLoading(false)
    }, 3000);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);
    // //state update
    // if(res) {
    //     dispatch(updateCompletedLectures(subSectionId)); 
    // }
    // setLoading(false);

  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      //different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      ///iss voide par jao 
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }


  const isFirstVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    //courseSectionData[currentSectionIndex].subSectionId
    console.log(courseSectionData[currentSectionIndex].subSection);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    }
    else {
      return false;
    }
  }


  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== 0) {
      //same section , prev video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      //iss video par chalge jao
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
      //different section , last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subsection[prevSubSectionLength - 1]._id;
      //iss video par chalge jao
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }
  }

  return (
    <div className="flex flex-col gap-5 text-white">

      {
        !videoData ?

          <div className='text-white'>ViewCourseVideoDetails</div> :

          <>

            <Player
              ref={playerRef}
              aspectRatio="16:9"

              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}>
              <BigPlayButton position="center" />

              {
                videoEnded &&
                (
                  <div style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">



                    <div className='flex gap-x-4'>
                      {
                        !completedLectures.includes(subSectionId) && (
                          <IconBtn
                            disabled={loading}
                            onclick={() => handleLectureCompletion()}
                            name={!loading ? "Mark As Completed" : "Loading..."}
                            customClasses="text-xl max-w-max px-4 mx-auto"
                          />

                        )}

                      <IconBtn
                        disabled={loading}
                        onclick={() => {
                          if (playerRef?.current) {
                            playerRef.current?.seek(0);
                            setVideoEnded(false);
                          }
                        }}
                        name="Rewatch"
                        customClasses="text-xl max-w-max px-4 mx-auto ml-2"
                      />
                    </div>

                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className='blackButton'
                        >
                          Prev
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className='blackButton'>
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )}
            </Player>
          </>
      }
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>

  )
}

export default ViewCourseVideoDetails