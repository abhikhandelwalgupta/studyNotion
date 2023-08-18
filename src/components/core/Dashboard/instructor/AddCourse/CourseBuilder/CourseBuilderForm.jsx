import React from 'react';
import { useForm } from 'react-hook-form';
import {  IoIosArrowDropright, IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { createSection } from '../../../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../../../slices/courseSlice';
import IconBtn from '../../../../../comman/IconBtn';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const dispatch = useDispatch();
    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }


    const onSubmit = async (data) => {
        const formData = {
            sectionName: data?.sectionName,
            courseId: course?._id
        }
        const result = await createSection(formData, token)
        dispatch(setCourse(result))
       


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
                    <div>
                        <button className='border border-yellow-50 flex gap-x-2 font-bold bg-transparent cursor-pointer px-5 text-yellow-100 py-2 rounded-lg mt-2 items-center'>
                            <span>Create Section</span> <IoMdAddCircleOutline />
                        </button>
                    </div>
                </form>
                {
                    course?.courseContent?.length > 0 && (
                    <NestedView/>
                    ) 
                }
                <div className='flex items-end justify-end gap-4'>
                    <button className='border bg-richblack-600 py-2 shadow-md px-5 rounded-lg font-bold' onClick={goBack}>
                        Back
                    </button>
                    <IconBtn name={"Next"}  ><IoIosArrowDropright /></IconBtn>
                </div>
            </div>
        </div>
    )
}

export default CourseBuilderForm