import React from 'react'

const plans = [
    "Paid membership",
    "For students",
    "Business solutions"
];

const community = [
    "Forums",
    "Chapters",
    "Events"
]
const PlanandCommunity = () => {
    return (
        <div className='flex xl:-ml-6 w-[30%] flex-col gap-5 xs:gap-0 mt-12 xs:w-full xs:flex-row xs:items-start '>
            <div className='flex flex-col flex-wrap gap-4 mr-28'>
                <h2 className='text-richblack-100 font-inter font-semibold   text-[16px]'>Plan</h2>
                {
                    plans.map((plan, index) => {
                        return (
                            <div className='text-richblack-400 text-[14px]  font-normal font-inter' key={index}>{plan}</div>
                        )
                    } )
                }
            </div>
            <div className='mt-8 flex flex-col flex-wrap gap-4 xs:mt-0'>
                <h2 className='text-richblack-100 font-inter font-semibold    text-[16px]'>Community</h2>
                {
                    community.map((ele , index)=> {
                        return(
                            <div className='text-richblack-400 text-[14px]  font-normal font-inter' key={index}>{ele}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PlanandCommunity