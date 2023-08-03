import React from 'react'
import IconBtn from '../../../comman/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { updatePassword } from '../../../../services/operations/authAPI'

const Password = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandleForm = (data,e) => {
    e.target.reset();
    try {
      console.log(data);
      const {
        oldPassword,
        newPassword,
        confrimPassword
      } = data;
      dispatch(updatePassword(oldPassword,newPassword,confrimPassword, token))
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }

  }
  return (
    <form onSubmit={handleSubmit(submitHandleForm)}>
      <div className='bg-richblack-800 w-full p-4 border border-richblack-700 rounded-md shadow-md'>
        <div className='flex flex-col gap-6'>
          <h1>Password</h1>
          <div className='flex lg:flex-row flex-col lg:gap-4 gap-2 w-full justify-between'>
            <div className='flex flex-col gap-1 lg:w-[48%]'>
              <label htmlFor="oldPassword" className="lable-style">Current Password</label>
              <input name='oldPassword' autoComplete='off' id='oldPassword' {...register("oldPassword", { required: true })} className="form-style" />
              {errors.oldPassword && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please enter correct old password.
                </span>
              )}
            </div>
            <div className='flex flex-col gap-1 lg:w-[48%]'>
              <label className='lable-style' htmlFor="newPassword">New Password</label>
              <input name='newPassword' autoComplete='off' id='newPassword' {...register("newPassword", { required: true })} className="form-style" />
              {errors.newPassword && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please enter correct old password.
                </span>
              )}
            </div>
            <div className='flex flex-col gap-1 lg:w-[48%]'>
              <label className='lable-style' htmlFor="confrimPassword">Confrim Password</label>
              <input name='confrimPassword' id='confrimPassword' {...register("confrimPassword", { required: true })} className="form-style" autoComplete='off' />
              {errors.confrimPassword && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Password Missmatch
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='mt-8 flex gap-4 justify-end'>
          <button onClick={() => {
            navigate("/dashboard/my-profile")
          }} className='bg-richblack-500 md:py-2 lg:px-4 px-4 text-base font-light rounded-md' >Cancel</button>
          <IconBtn type="submit" name={"Save"} > </IconBtn>
        </div>
      </div>
    </form>
  )
}

export default Password