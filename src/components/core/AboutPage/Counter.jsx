import React from "react";
import CountUp from 'react-countup';

const data = [
  {
    count: "5",
    label: "Active Student",
  },
  {
    count: "10",
    label: "Mentor",
  },
  {
    count: "200",
    label: "Courses",
  },
  {
    count: "50",
    label: "Awards",
  },
];
const Counter = () => {
  return (
    <div className="max-w-maxContent w-11/12 mx-auto">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] md:gap-0 gap-10 place-items-center flex-wrap items-center py-8 md:h-[200px] h-[450px] xl:h-[200px]">
        {
            data.map((data , index)=>{
                return (
                    <div key={index} className="flex font-inter items-center justify-center flex-col gap-1">
                        <h2 className="text-richblack-5 text-2xl font-extrabold">{<CountUp start={0}  end={data.count}  duration={5}/>}+</h2>
                        <p className="font-semibold text-[16px] text-richblack-500">{data.label}</p>
                        
                    </div>
                )
            })
        }
      </div>
    </div>
  );
};

export default Counter;
