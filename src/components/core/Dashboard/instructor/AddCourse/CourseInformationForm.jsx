import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import ChildInput from './ChildInput';
import IconBtn from '../../../../comman/IconBtn';
import { MdNavigateNext } from "react-icons/md"
import Uploader from './Uploader';

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    // const dispatch = useDispatch();
    const [courseCategories, setCourseCategories] = useState([])
    const { course, editCourse } = useSelector((state) => state.course)

    useEffect(() => {
        const getCategory = async () => {
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                // console.log("categories", categories)
                setCourseCategories(categories)

            }
        }
        getCategory();
        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isFormUpdated = (e) => {

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

    const handleOnSubmit = (data, e) => {
        if (isFormUpdated()) {
            console.log("");
        }
        // e.preventDefault()

        console.log(`DATA :- ${JSON.stringify(data)}`);
    }

    return (
        <form className='bg-richblack-800 text-richblack-5 p-4 border border-richblack-700 rounded-xl shadow' onSubmit={handleSubmit(handleOnSubmit)} >
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
                    <input className='form-style  !pl-12' placeholder='Enter Course Price' id='coursePrice' name="coursePrice"  {...register("courseprice", { required: true })} />
                    <HiOutlineCurrencyRupee className='absolute top-[3.5rem] inline-block left-3 -translate-y-1/2 text-2xl text-richblack-400' />
                    {errors.courseprice && (
                        <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                            Please enter Course Course Price.
                        </span>
                    )
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='label-style'>Course Category  <sup className='text-red-5'> * </sup></label>
                    <select className='form-style text-richblack-5 space-y-2' name='courseCategory' id='courseCategory' {...register("courseCategory", { required: true })}>
                        <option value="" disabled selected>
                            Choose a Category
                        </option>
                        {
                            courseCategories?.map((categorie, index) => (
                                <option key={index} value={categorie?._id} >
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
                <Uploader label={"Course Thumbnail"}  errors={errors} />

                <div className='mt-4 flex items-end justify-end'>
                    <IconBtn name={"Next"}> <MdNavigateNext /></IconBtn>
                </div>
            </div>


        </form>
    )
}



export default CourseInformationForm