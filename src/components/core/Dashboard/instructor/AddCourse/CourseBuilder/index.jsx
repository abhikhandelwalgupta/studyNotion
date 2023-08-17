import React from 'react'
import { useForm } from 'react-hook-form';


const index = () => {

   
    return (
        <div className='bg-richblack-800 border border-richblack-700 rounded-lg'>
            <div className='py-8 px-8 flex flex-col flex-1 gap-4 w-full' >
                <h2 className='text-richblack-25 font-semibold text-2xl'>Course Builder</h2>
                <form className='flex flex-col w-full gap-2'>
                    <label className='label-style text-richblack-5'>Section Name <sup className='text-red-5'>*</sup></label>
                    <input className='form-style' placeholder='Add a section to build your course' />
                </form>
            </div>
        </div>
    )
}

export default index