import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../../comman/IconBtn';
import { setStep } from '../../../../../../slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';


const PublishCourse = () => {

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const handleOnSubmit = (data, e) => {
        e.preventDefault()
        console.log(data);
    }
    return (
        <>
            <div className='text-richblack-5 bg-richblack-800 w-full p-6 rounded-lg border-[1px] border-richblack-600 shadow'>
                <p className="text-2xl font-semibold text-richblack-5">
                    Publish Settings
                </p>
                <form className='mt-8' onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className='my-6 mb-8'>
                        <label htmlFor="public" className='label-style text-richblack-300'>
                            <input type="checkbox" id="public"  {...register("public")} className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5" />
                            <span className="ml-2 text-richblack-400">
                                Make this course as public
                            </span>
                        </label>
                    </div>
                    <div className='flex items-end justify-end mt-12 gap-4' >
                        <button className='border py-2 bg-richblack-300 text-richblack-900 font-bold  rounded-md border-richblack-800 px-5' onClick={() => dispatch(setStep(2))} >Back</button>
                        <IconBtn name={""} >Save Changes</IconBtn>
                    </div>
                </form>
            </div>
        </>
    )
}

export default PublishCourse