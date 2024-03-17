import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from 'react-router-dom'
const CareerBuilding = () => {
  return (
    <div className='flex xl:-ml-12 w-[30%] flex-col font-inter gap-4 xl:pl-8  xl:mt-12 xs:w-full xs:mt-8'>
    <h1 className='font-semibold text-richblack-100'>{FooterLink2[2].title}</h1>
    {
      FooterLink2[2].links.map((ele, index)=>{
        return (<div className='text-richblack-400 text-[14px]  font-normal font-inter' key={index} >
          <Link to={ele.link}>{ele.title}</Link>
        </div>)
      })
    }
    </div>
  )
}

export default CareerBuilding