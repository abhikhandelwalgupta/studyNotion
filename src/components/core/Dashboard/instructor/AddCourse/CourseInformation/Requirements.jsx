import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx"
import { useSelector } from 'react-redux';

const Requirements = ({ placeholder, label, setValue, name, register, errors }) => {

    const [benefits, setbenefits] = useState("");
    const { course, editCourse } = useSelector((state) => state.course)
    const [requirementsList, setRequirementsList] = useState([])


    useEffect(() => {
        if (editCourse) {
            setRequirementsList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, requirementsList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementsList])

    const handleAddTag = (e) => {
        e.preventDefault();
        if (benefits) {
            setRequirementsList([...requirementsList, benefits])
            setbenefits("")
        }
    }

    const removeRequirement = (requirementIndex) => {
        const updatedRequirement = requirementsList.filter((_, index) => requirementIndex !== index)
        setRequirementsList(updatedRequirement)
    }


    return (
        <div className='flex flex-col gap-2'>
            <label>{label}  <sup className='text-red-5'>*</sup></label>
            <input className='form-style' value={benefits} name={name} placeholder={placeholder} onChange={(e) => setbenefits(e.target.value)} />
            {
                errors.courseRequirements && (
                    <span className="-mt-1 text-[14px] capitalize font-inter text-red-5">
                        Please add atlest Requirements
                    </span>
                )
            }
            <div>
                <button className='px-3 py-1 font-bold  text-yellow-5 shadow rounded' onClick={handleAddTag}  >Add</button>
            </div>
            {
                requirementsList?.length > 0 && (
                    <ul className="mt-2 list-inside list-disc">
                        {
                            requirementsList.map((requirement, index) => {
                                return (<li key={index} className="flex items-center text-richblack-5" ><span>{requirement}</span><sup><button type="button"
                                    className="ml-1 text-xs text-red-5 " onClick={() => removeRequirement(index)}><RxCross2 /></button></sup></li>)
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default Requirements