import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories } from '../../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChildInput from './ChildInput';
import IconBtn from '../../../../../comman/IconBtn';
import { MdNavigateNext } from "react-icons/md";
import Uploader from '../Uploader';
import Requirements from './Requirements';
import { COURSE_STATUS } from "../../../../../../utils/constants";
import { setCourse, setStep } from '../../../../../../slices/courseSlice';

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const [courseCategories, setCourseCategories] = useState([])
    const { course, editCourse } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        const getCategory = async () => {
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories)
            }
        }

        getCategory();
        if (editCourse) {
            setValue("courseTitle", course?.courseName)
            setValue("courseShortDesc", course?.courseDescription)
            setValue("coursePrice", course?.price)
            setValue("courseTags", course?.tag)
            setValue("courseBenefits", course?.whatYouWillLearn)
            setValue("courseCategory", course?.category)
            setValue("courseRequirements", course?.instructions)
            setValue("courseImage", course?.thumbnail)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isFormUpdated = () => {

        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.courseTitle !== course?.courseName ||
            currentValues.courseShortDesc !== course?.courseDescription ||
            currentValues.coursePrice !== course?.price ||
            currentValues.courseTags.toString() !== course?.tag.toString() ||
            currentValues.courseBenefits !== course?.whatYouWillLearn ||
            currentValues.courseCategory._id !== course?.category._id ||
            currentValues.courseRequirements.toString() !==
            course?.instructions.toString() ||
            currentValues.courseImage !== course?.thumbnail
        ) {
            return true
        }
        return false
    }

    const handleOnSubmit = async (data, e) => {
        e.preventDefault()
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course?.courseName) {
                    formData.append("courseName", data.courseTitle)
                } if (currentValues.courseShortDesc !== course?.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                } if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                } if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                } if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.courseRequirements)
                    )
                } if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                dispatch(setStep(2))
                // console.log(result);
            }
            return
        }

        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        const result = await addCourseDetails(formData, token)
        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }

        //console.log(`DATA :- ${JSON.stringify(data)}`);
    }

    return (
        <form
            className='bg-richblack-800 text-richblack-5 p-4 border border-richblack-700 rounded-xl shadow' onSubmit={handleSubmit(handleOnSubmit)} >
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    <label className='label-style' >Course Title  <sup className='text-red-5'> * </sup></label>
                    <input className='form-style' placeholder='Enter Course  Title' name="courseTitle" id='courseTitle' {...register("courseTitle", { required: true })} />
                    {
                        errors.courseTitle && (
                            <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                                Please enter Course  Title.
                            </span>
                        )
                    }

                </div>

                <div className='flex flex-col gap-2'>
                    <label className='label-style' >Course Short Description   <sup className='text-red-5'> * </sup></label>
                    <textarea className='form-style min-h-[150px]' id='courseShortDesc' placeholder='Enter Course Description' name="courseShortDesc" {...register("courseShortDesc", { required: true })} />
                    {errors.courseShortDesc && (
                        <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                            Please enter Course Short Description.
                        </span>
                    )
                    }
                </div>
                <div className='relative flex flex-col gap-2'>
                    <label className='label-style'  >Course Price   <sup className='text-red-5'> * </sup></label>
                    <input className='form-style  !pl-12' placeholder='Enter Course Price' id='coursePrice' name="coursePrice"  {...register("coursePrice", { required: true })} />
                    <HiOutlineCurrencyRupee className='absolute top-[3.5rem] inline-block left-3 -translate-y-1/2 text-2xl text-richblack-400' />
                    {errors.coursePrice && (
                        <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                            Please enter Course Course Price.
                        </span>
                    )
                    }
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='label-style'>Course Category  <sup className='text-red-5'> * </sup></label>
                    <select className='form-style text-richblack-5 space-y-2' name='courseCategory' id='courseCategory' {...register("courseCategory", { required: true })}>
                        <option value="DEFAULT" disabled selected>
                            Choose a Category
                        </option>
                        {
                            courseCategories?.map((categorie, index) => (
                                <option key={index} value={categorie?._id}  >
                                    {categorie?.Name}
                                </option>
                            ))
                        }
                    </select>
                    {errors.courseCategory && (
                        <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                            Please Select Course Category.
                        </span>
                    )
                    }
                </div>
                <ChildInput placeholder={"Enter Tags and press Enter"} label={"Tags"} register={register} error={errors} name={"courseTags"} setValue={setValue} getValues={getValues} />
                <Uploader
                    label={"Course Thumbnail"}
                    errors={errors}
                    name={"courseImage"}
                    register={register}
                    setValue={setValue}
                    editData={editCourse ? course?.thumbnail : null}
                />
                <div className='flex flex-col gap-2'>
                    <label className='label-style'>Benefits of the course <span className='text-red-20'>*</span></label>
                    <textarea className='form-style min-h-[150px]' placeholder='Enter benefits of the course' name='courseBenefits' id='courseBenefits' {...register("courseBenefits", { required: true })} />
                    {
                        errors.courseBenefits && (
                            <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                                Please enter Benefits of the Course .
                            </span>
                        )
                    }
                </div>
                <Requirements placeholder={"Enter course tag"} label={"Requirements/Instructions"} setValue={setValue} name={"courseRequirements"} register={register} errors={errors} />

                <div className='flex items-end gap-2 justify-end'>
                    {
                        editCourse && (
                            <button className='bg-richblack-300 py-2 px-4 rounded-md flex cursor-pointer items-center gap-x-2  text-richblack-900 font-semibold' type='button' onClick={()=> dispatch(setStep(2))} >
                                Continue Without Saving
                            </button>
                        )
                    }

                    <div className='mt-4 flex items-end justify-end'>
                        <IconBtn name={editCourse ? "Save changes" : "Next"}> <MdNavigateNext /></IconBtn>
                    </div>
                </div>
            </div>
        </form>
    )
}



export default CourseInformationForm