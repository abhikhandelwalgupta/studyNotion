import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from "react-icons/fi"


const Uploader = ({ label, errors, video = false, }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState("")

    const inputRef = useRef(null)
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const file = acceptedFiles[0]
        if (file) {
            // previewFile(file)
            setSelectedFile(file)
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
            ? { "image/*": [".jpeg", ".jpg", ".png"] }
            : { "video/*": [".mp4"] },
        onDrop,
    })

    return (
        <div className='flex flex-col gap-2'>
            <label className='label-style'>{label} <sub className='text-red-5'>*</sub></label>
            <div className='bg-richblack-700 min-h-[250px] rounded-md border-dotted border-2 flex justify-center cursor-pointer items-center border-richblack-500'>
                <div className='flex flex-col items-center gap-10'  {...getRootProps()}>
                    <input {...getInputProps()} ref={inputRef} />
                    <div className='text-yellow-100 text-2xl bg-pure-greys-800 p-4 rounded-full  w-14 aspect-square'>
                        <FiUploadCloud />
                    </div>
                    <p className='max-w-[200px] -mt-8 text-richblack-300 text-sm text-center'>Drag and drop an image, or click to  <span className="font-semibold text-yellow-50">Browse</span> a file</p>

                    <ul className=' list-disc flex justify-between  gap-10 w-full'>
                        <li className='text-richblack-300 text-sm'>Aspect ratio 16:9 </li>
                        <li className='text-richblack-300 text-sm'>Recommended size 1024x576</li>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Uploader