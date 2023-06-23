import React from 'react'
import {FooterLink2} from "../../data/footer-links"
import { Link } from 'react-router-dom'
const Subjects = () => {
  return (
    <div className='flex lg:-ml-6 w-[30%
    ] flex-col font-inter gap-4 lg:pl-8 lg:border-l-2 lg:mt-0 mt-12 '>
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