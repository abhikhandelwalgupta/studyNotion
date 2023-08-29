import React, { useState } from 'react'
import { RxDropdownMenu } from "react-icons/rx"
import { useSelector } from 'react-redux';
import { AiFillCaretDown, AiOutlineDelete } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { BsPencil } from "react-icons/bs"
import SubSectionModal from './SubSectionModal';


const NestedView = () => {
    const { course } = useSelector((state) => state.course)
    const [addSubSection, setAddSubsection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)


    return (
        <>
            <div className='bg-richblack-700 border border-richblack-600 rounded-md'>
                <div className='p-4 '>
                    {
                        course?.courseContent.map((section) => (

                            <details key={section._id} className=' border-richblack-100 mt-4 space-y-2' open>
                                <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                                    <div className="flex items-center gap-x-3">
                                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                                        <p className="font-semibold text-richblack-50">
                                            {section.sectionName}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <div className='border-r  border-richblack-100'>
                                            <div className='flex gap-3 pr-2'>
                                                <BsPencil className={`text-lg text-richblack-300`} />
                                                <AiOutlineDelete className={`text-lg text-richblack-300`} />
                                            </div>
                                        </div>
                                        <AiFillCaretDown className={`text-xl text-richblack-300`} />
                                    </div>
                                </summary>

                                <div className='px-6'>
                                    {
                                        section.subSection.map((data, index) => {
                                            console.log(`data `, data);
                                            return (
                                                <div className="flex border-b-2 border-b-richblack-600   py-2 justify-between  items-center gap-x-3" key={index}>
                                                    <div className='flex items-center gap-x-3 cursor-pointer' onClick={() => setViewSubSection(data)}>
                                                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                        <p className="font-semibold text-richblack-50">{data.title}</p>
                                                    </div>
                                                    <div className='flex gap-3 pr-2'>
                                                        <BsPencil className={`text-lg text-richblack-300 cursor-pointer`} onClick={() => setEditSubSection(data)} />
                                                        <AiOutlineDelete className={`text-lg text-richblack-300`} />
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                    {/* {section.subSection.map((data) => (
                                        
                                    ))} */}


                                    <button
                                        onClick={() => setAddSubsection(section._id)}
                                        className="mt-3 flex items-center gap-x-1 text-yellow-50"
                                    >
                                        <FaPlus className="text-lg" />
                                        <p>Add Lecture</p>
                                    </button>

                                </div>
                            </details>
                        ))
                    }

                </div>
            </div>
            {addSubSection ? (
                <SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubsection}
                    add={true}
                />
            ) : viewSubSection ? (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            ) : editSubSection ? (
                <SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />
            ) : (
                <></>
            )}
        </>
    )
}

export default NestedView