import React from 'react'

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Resource = () => {
  return (
    <div className='w-[30%] xl:-ml-10 flex flex-col gap-4 font-inter justify-between mt-12'>
      <h1 className='text-richblack-100 font-inter font-semibold   text-[16px]'>Resource</h1>
      {
        Resources.map((ele , i)=>{ 
          return(
          <div key={i} className='font-normal text-[14px] text-richblack-400' >{ele}</div>)
        })
      }
    </div>
  )
}

export default Resource