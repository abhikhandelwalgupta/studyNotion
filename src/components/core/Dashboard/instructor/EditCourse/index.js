import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setCourse, setEditCourse } from '../../../../../slices/courseSlice'
import { getFullDetailsOfCourse } from '../../../../../services/operations/courseDetailsAPI'
import RenderSteps from '../AddCourse/RenderSteps'

const EditCourse = () => {
    const dispatch = useDispatch()
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const { courseId } = useParams()
    const [loading, setLoading] = useState();

    useEffect(() => {
        ; (async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            if (result) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result))
            }
            setLoading(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='w-full'>
            <h1 className='text-richblack-5 text-3xl font-medium'>Edit Course </h1>
            <div className="mx-auto max-w-[600px] text-richblack-25">
                {
                    course ? (
                        <RenderSteps />
                    ) : (
                        <h2> Course doesn't not exist </h2>
                    )
                }
            </div>
        </div>
    )
}

export default EditCourse