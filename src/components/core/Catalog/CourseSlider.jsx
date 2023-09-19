import React from 'react';
import CourseCard from './CourseCard';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  Navigation, Pagination, Scrollbar } from 'swiper/modules';

const CourseSlider = ({ Courses ,btnClass }) => {
  console.log((Courses?.length ));
    return (
        <>


            {
                Courses?.length >0 ? (
                    <>
                        <div className='flex justify-between relative'>
                            <button className= {`${btnClass}-arrow-left arrow  absolute -left-20 top-24 text-2xl`}> <IoIosArrowBack /> </button>
                            <button className={`${btnClass}-arrow-right arrow -right-20 absolute  top-24 text-2xl`}><IoIosArrowForward /></button>
                        </div>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar]}
                            spaceBetween={25}
                            loop={true}
                            navigation={{ nextEl: "."+btnClass+"-arrow-left", prevEl:  "."+btnClass+"-arrow-right" }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            Navigation={true}
                            scrollbar={{ draggable: true }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="max-h-[30rem] relative"
                        >
                            {
                                Courses?.map((course, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <CourseCard course={course} Height={"h-[250px]"} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </>
                ) : (
                    <p className="text-xl text-center text-richblack-5">No Course Found</p >
                )
            }


        </>
    )
}

export default CourseSlider