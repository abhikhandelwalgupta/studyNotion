import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {FaFacebook, FaGoogle, FaTwitter, FaYoutube} from "react-icons/fa"
import { Link } from 'react-router-dom'
 
export const SectionOne = () => {
  return (
    <div className='flex xl:flex-col flex-wrap flex-col xl:w-[30%] xs:w-[50%] sm:w-[30%] gap-6'>
          <div><img src={Logo} alt='Logo' className='object-contain' /></div>
          <div className='flex flex-col gap-4'>
            <h1 className='text-richblack-100 font-inter font-semibold -mt-2 flex flex-row text-[16px]'>Company</h1>
            {["About", "Careers", "Affillates"].map((ele, i) => {
              return (
                <div key={i} className='text-richblack-400 text-[14px]  font-normal font-inter'><Link to={ele}>{ele}</Link></div>
              )
            })}
          </div>
           
          <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
        </div>
  )
}
