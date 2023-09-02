import React from 'react'
import { useForm } from "react-hook-form"
import IconBtn from '../../../comman/IconBtn';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../services/operations/settingAPI';
import { toast } from 'react-hot-toast';

const genders = ["Male", "Female", "Other"]

const ProfileInformation = ({ userDetails }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      toast.error(error.message)
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
console.log(userDetails?.profile);

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className='w-full bg-richblack-800 border border-richblack-700 p-6'>
        <div className='flex flex-col'>
          <h1 className='text-richblack-5 text-xl font-medium'> Profile Information</h1>

          <div className='flex mt-4 lg:flex-row flex-col w-full justify-between '>
            <div className='flex flex-col lg:gap-3 gap-2 lg:w-[48%] mb-3'>
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input className="form-style capitalize" id="firstName" type='text' defaultValue={userDetails?.firstName} name='firstName' {...register("firstName", { required: true })} placeholder='Enter First Name' />
              {errors.firstName && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className='flex flex-col lg:gap-3 gap-2 lg:w-[48%] mb-3'>
              <label htmlFor="firstName" className="lable-style">
                Last Name
              </label>
              <input className="form-style capitalize" id="lastName" type='text' name='lastName' defaultValue={userDetails?.lastName} {...register("lastName", { required: true })} placeholder='Enter Last Name' />
              {errors.lastName && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>
          <div className='flex lg:flex-row flex-col mt-4 w-full justify-between '>
            <div className='flex flex-col lg:gap-3 gap-2 lg:w-[48%] mb-3'>
              <label htmlFor="firstName" className="lable-style">
                Date of Birth
              </label>
              <input className="form-style"
                defaultValue={userDetails?.profile?.dob?.substring(0, 10)}
                name='dateOfBirth' id="dateOfBirth" {...register("dateOfBirth", { required: true })} type='date' />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please enter your dob.
                </span>
              )}
            </div>
            <div className='flex flex-col lg:gap-3 gap-2 lg:w-[48%] mb-3'>
              <label htmlFor="firstName" className="lable-style">
                Gender
              </label>
              <select
                name="gender"
                {...register("gender", { required: true })}
                id="gender"
                className="form-style"
                defaultValue={userDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please select gender.
                </span>
              )}
            </div>
          </div>
          <div className='flex mt-4  lg:flex-row flex-col w-full justify-between '>
            <div className='flex flex-col lg:gap-3 gap-2 lg:w-[48%] mb-3'>
              <label htmlFor="firstName" className="lable-style">
                Contact Number
              </label>
              <input className="form-style" type='number' name='mobileNumber' id='mobileNumber' defaultValue={userDetails?.phoneNO} {...register("mobileNumber", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number.",
                },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })} placeholder='Enter Contact Number' />
              {errors.mobileNumber && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please enter mobile number.
                </span>
              )}
            </div>
            <div className='flex flex-col lg:gap-3 gap-2 lg:w-[48%] mb-3'>
              <label htmlFor="firstName" className="lable-style">
                About
              </label>
              <input className="form-style" name='about' id='about' type='text' {...register("about", { required: true })} placeholder='Enter Bio Details'
                defaultValue={userDetails?.profile?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                  Please enter your Bio.
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

export default ProfileInformation