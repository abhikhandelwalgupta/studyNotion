import React from 'react'
import { Link } from 'react-router-dom'

export const CTABUTTON = ({children , active , linkto}) => {
  
  return (
    <Link to={linkto}>
       <div className={`text-center text-[16px]  leading-[24px] font-[500px] shadow-xl px-6 py-3 rounded-md ${active ? "bg-yellow-50 text-richblack-900" :"bg-richblack-800 hover:scale-95 transition-all duration-200 text-[#F1F2FF]"}`}>
       {children}
       </div>
    </Link>
  )
}
