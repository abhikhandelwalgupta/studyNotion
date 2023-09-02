import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RxCross1 } from "react-icons/rx"

const ChildInput = ({ placeholder, label, register, error, name, setValue, getValues }) => {

    const [chips, setChips] = useState([])
    const { course, editCourse } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
            setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, chips)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips])

    const addTages = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const chipValue = e.target.value.trim()

            if (chipValue && !chips?.includes(chipValue)) {
                const newChip = [...chips, chipValue]
                setChips(newChip)
            }
            e.target.value = ""

        }
    }

    const chipDelete = (chipIndex) => {
        let afterDeleteChip = chips.filter((_, index) => index !== chipIndex)
        setChips(afterDeleteChip)
    }
    return (
        <div className='flex flex-col gap-2 w-full'>
            <label className='label-style'>{label}  <sup className='text-red-5'> * </sup></label>
            {
                chips?.length > 0 && (
                    <div className='flex my-2 flex-wrap gap-3'>
                        {
                            chips.map((chips, index) => (
                                <div className='bg-yellow-400 p-1 px-3 flex items-center gap-1 rounded-full capitalize' key={index}>
                                    <p className='text-sm'> {chips} </p>
                                    <span className='cursor-pointer text-xs' onClick={() => chipDelete(index)}> <RxCross1 /> </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            <input className='form-style' placeholder={placeholder} name='courseTags' onKeyDown={addTages} />
            {
                error.courseTags && (
                    <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                        Please enter atlest one tag
                    </span>
                )
            }
        </div>
    )
}

export default ChildInput