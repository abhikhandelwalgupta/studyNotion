import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateMainSection } from '../../../../../../services/operations/SectionsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../../../slices/courseSlice';
import IconBtn from '../../../../../comman/IconBtn';
import NestedView from './NestedView';
import { IoAddCircleOutline } from "react-icons/io5"

const CourseBuilderForm = () => {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [editSectionName, setEditSectionName] = useState(null)
    const [loading, setloading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const cancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    const dispatch = useDispatch();
    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }


    const onSubmit = async (data) => {

        let formData = {
            sectionName: data?.sectionName,
            courseId: course?._id
        }
        let result;
        if (editSectionName) {
            formData = { ...formData, sectionId: editSectionName }
            result = await updateMainSection(formData, token);
        } else {
            result = await createSection(formData, token)
            dispatch(setCourse(result))
        }
        console.log(result);
        if (result) {
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue("sectionName", "")
        }

    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit()
            return
        }
        console.log(`inside handeChangeEditSection `, sectionId);
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
        setValue("sectionId", sectionId)
    }

    return (
        <div className='bg-richblack-800 border border-richblack-700 rounded-lg'>
            <div className='py-8 px-8 flex flex-col flex-1 gap-4 w-full' >
                <h2 className='text-richblack-25 font-semibold text-2xl'>Course Builder</h2>

                <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-2'>
                        <label className='label-style text-richblack-5'>Section Name <sup className='text-red-5'>*</sup></label>
                        <input className='form-style' placeholder='Add a section to build your course' name='sectionName' id='sectionName' {...register("sectionName", { required: true })} />
                        {
                            errors.sectionName && (
                                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                                    please enter section name
                                </span>
                            )
                        }
                    </div>
                    <div className="flex items-end gap-x-4">
                        <IconBtn name={editSectionName ? "Edit Section Name" : "Create Section"} disabled={loading} type="submit" ><IoAddCircleOutline size={20} /></IconBtn>
                        {editSectionName && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="text-sm text-richblack-300 underline"
                            >
                                Cancel Edit
                            </button>
                        )}

                    </div>
                </form>
                {
                    course?.courseContent?.length > 0 && (
                        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                    )
                }
                <div className='flex items-end justify-end gap-4'>
                    <button className='border bg-richblack-600 py-2 shadow-md px-5 rounded-lg font-bold' onClick={goBack}>
                        Back
                    </button>
                    <IconBtn name={"Next"} onclick={() => dispatch(setStep(3))} ><IoIosArrowDropright /></IconBtn>
                </div>
            </div>
        </div>
    )
}

export default CourseBuilderForm