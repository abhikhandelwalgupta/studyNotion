import React from 'react';
import CourseCard from './CourseCard';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  Navigation, Pagination, Scrollbar } from 'swiper/modules';

const CourseSlider = ({ Courses }) => {
    return (
        <>


            {
                Courses?.length ? (
                    <>
                        <div className='flex justify-between relative'>
                            <button className="arrow-left arrow  absolute -left-20 top-24 text-2xl"> <IoIosArrowBack /> </button>
                            <button className="arrow-right arrow -right-20 absolute  top-24 text-2xl"><IoIosArrowForward /></button>
                        </div>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar]}
                            spaceBetween={25}
                            loop={true}
                            navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
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