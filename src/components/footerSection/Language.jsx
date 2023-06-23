import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from 'react-router-dom'
const Language = () => {
  return (
    <div className='flex lg:-ml-12 lg:w-[30%
    ] flex-col font-inter gap-4 lg:pl-8 lg:mt-0 mt-8'>
    <h1 className='font-semibold text-richblack-100'>{FooterLink2[1].title}</h1>
    {
      FooterLink2[1].links.map((ele, index)=>{
        return (<div className='text-richblack-400 text-[14px]  font-normal font-inter' key={index} >
          <Link to={ele.link}>{ele.title}</Link>
        </div>)
      })
    }
    </div>
  )
}

export default Language