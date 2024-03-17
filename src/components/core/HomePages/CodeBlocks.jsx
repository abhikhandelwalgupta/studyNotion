import React from 'react'
import { CTABUTTON } from './Button'
import { BsArrowRightShort } from "react-icons/bs";
import { TypeAnimation } from 'react-type-animation';

export const CodeBlocks = ({position , heading , subheading ,ctabtn1 , ctabtn2 , codeblock , bgGradient , codeblockStyle }) => {
  return (
    <div className={`flex ${position} w-full my-20 justify-between gap-20 xs:flex-col sm:flex-row xs:item-center `}>
        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-4 xs:w-[100%] sm:w-[100%] '>
            {heading}
            <div className='text-richblack-200 font-bold  '>
                {subheading}
            </div>
            <div className='flex font-bold gap-7 mt-8   xs:items-center xs:justify-center xs:mx-auto xs:text-sm'>
                <CTABUTTON active={ctabtn1.active} linkto={ctabtn1.linkto } >
                    <div className='flex font-bold gap-2 items-center'>
                        {ctabtn1.btnText}
                        <BsArrowRightShort/>
                    </div>
                </CTABUTTON>

                <CTABUTTON active={ctabtn2.active} linkto={ctabtn2.linkto } >
                        {ctabtn2.btnText}
                </CTABUTTON>
            </div>
        </div>

        {/* Section 2 */}
        <div className={`flex h-fit text-[16px]   shadow-2xl  xs:w-[90%] sm:w-[90%] w-[40%] border-[0.5px]  border-richblue-100 codeBlock-border p-4`}>
            <div className={`${codeblockStyle} absolute`}></div>
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className='grid grid-cols-3  divide-x'></div>
        <div className={`w-[90%] xs:w-[80%] xs:text-xs flex flex-col text-pink-100 font-bold font-mono ${codeblock} `}>
            <TypeAnimation 
            sequence={[codeblock , 10000 ,""]} 
            repeat={Infinity} style={{
                whiteSpace:"pre-line",
                display:"block"
            }}
            
            omitDeletionAnimation={true}
             />
        </div>
        </div>
    </div>
  )
}
