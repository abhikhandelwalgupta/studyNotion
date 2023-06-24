import React from 'react'
import { SectionOne } from '../footerSection/SectionOne'
import Resource from '../footerSection/Resource'
import PlanandCommunity from '../footerSection/PlanandCommunity'
import Subjects from '../footerSection/Subjects'
import Language from '../footerSection/Language'
import CareerBuilding from '../footerSection/CareerBuilding'
// import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="w-11/12 max-w-maxContent flex text-richblack-400 leading-4 relative py-14 items-center gap-3 mt-4 mx-auto justify-between font-inter">
      <div className='border-b w-[100%] flex flex-col lg:flex-row   pb-5 border-richblack-700 '>
        {/* Section 1 */}
        <div className='lg:w-[50%] flex flex-wrap flex-row justify-between  items-start   pl-3 lg:pr-5 gap-3  '>
          <SectionOne />
          <Resource />
          <PlanandCommunity />
        </div>

        {/* section 2 */}
        <div className='flex flex-row w-[50%] flex-wrap lg:items-start items-center  justify-around gap-4 '>
          <Subjects />
          <Language />
          <CareerBuilding />
        </div>
        
      </div>
     
    </div>
  )
}

export default Footer