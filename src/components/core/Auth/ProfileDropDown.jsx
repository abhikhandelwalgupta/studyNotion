import React from 'react'
import { useSelector } from 'react-redux'

const ProfileDropDown = () => {
    const  {user} = useSelector((state) => state.profile)
    console.log(`user : ${JSON.stringify(user)}`); 
    //aspect-square w-[30px]
    return (
    <div className='flex flex-row'> 
        
        <img src={user?.image} alt='' className='bg-richblack-25 w-[30px] rounded-full object-cover aspect-square' />
        
    </div>
  )
}

export default ProfileDropDown