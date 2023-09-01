import React, { useState } from 'react'
import { HightlightText } from './HightlightText'
import { HomePageExplore } from '../../../data/homepage-explore';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];
export const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [course , setCourse] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value)=> {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag=== value);
        setCourse(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }
    
  return (
    <div className='flex flex-col items-center justify-center gap-6 font-inter'>
        <h2 className='text-4xl font-semibold'>Unlock the  <HightlightText text={"Power of Code"} /></h2>
        <p className='text-richblack-300 -mt-5 font-[500] text-[16px]'>Learn to build Anything You Can imagine</p>

        <div className="hidden lg:flex gap-5  mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
            {
                tabsName.map((element , index) => {
                    return (
                        <div className={`text-[16px] flex flex-row item-center gap-2 ${currentTab===element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 ` } key={index}
                        onClick={() => setMyCard(element)} >
                            {element}
                        </div>
                    );
                })
            }
        </div>
    </div>
  )
}
