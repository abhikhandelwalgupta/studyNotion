import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../../slices/courseSlice'
import { createSubSection, updateSubSection } from '../../../../../../services/operations/courseDetailsAPI'



export default function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)

    useEffect(() => {
        if (view || edit) {
            // console.log("modalData", modalData)
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // detect whether form is updated or not
    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true
        }
        return false
    }

    // handle the editing of subsection
    const handleEditSubsection = async () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        const formData = new FormData()
        // console.log("Values After Editing form values:", currentValues)
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo)
        }
        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
            // console.log("result", result)
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }


    const onSubmit = async (data) => {
        // console.log(data)
        if (view) return
    
        if (edit) {
          if (!isFormUpdated()) {
            toast.error("No changes made to the form")
          } else {
            handleEditSubsection()
          }
          return
        }
    
        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        setLoading(true)
        const result = await createSubSection(formData, token)
        if (result) {
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData ? result : section
          )
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
      }



        return (
            <>
                <div className="modal-overlay">
                    <div className="modal">
                        <button >Close Modal</button>
                        {/* Modal Content */}
                    </div>
                </div>
            </>
        )
    }


