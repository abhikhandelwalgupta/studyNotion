import React from 'react'
import {FooterLink2} from "../../data/footer-links"
import { Link } from 'react-router-dom'
const Subjects = () => {
  return (
    <div className='flex xl:-ml-16 xl:w-[30%
    ] flex-col font-inter gap-4 xl:pl-16 xl:border-l-2  xl:mt-12 '>
    <h1 className='font-semibold text-richblack-100'>{FooterLink2[0].title}</h1>
    {
      FooterLink2[0].links.map((ele, index)=>{
        return (<div className='text-richblack-400 text-[14px]  font-normal font-inter' key={index} >
           <Link to={ele.link}>{ele.title}</Link>
        </div>)
      })
    }
    </div>
  )
}

export default Subjects