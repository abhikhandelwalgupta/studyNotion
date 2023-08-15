import React, { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from "react-icons/fi"
import { Player } from 'video-react'


const Uploader = ({ label, errors, name, video = false, viewData = null, editData = null, register, setValue }) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    )

    const inputRef = useRef(null)
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const file = acceptedFiles[0]
        if (file) {
            previewFile(file)
            setSelectedFile(file)
        }
    }, []);


    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    useEffect(() => {
        register(name, { required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register])

    useEffect(() => {
        setValue(name, selectedFile)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
            ? { "image/*": [".jpeg", ".jpg", ".png"] }
            : { "video/*": [".mp4"] },
        onDrop,
    });


    return (
        <div className='flex flex-col gap-2'>
            <label className='label-style'>{label} <sub className='text-red-5'>*</sub></label>
            <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"
                } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}> {
                    previewSource ? (
                        <div className="flex w-full flex-col p-6">
                            {!video ? (
                                <img
                                    src={previewSource}
                                    alt="Preview"
                                    className="h-full w-full rounded-md object-cover"
                                />
                            ) : (
                                <Player aspectRatio="16:9" playsInline src={previewSource} />
                            )}
                            {!viewData && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewSource("")
                                        setSelectedFile(null)
                                        setValue(name, null)
                                    }}
                                    className="mt-3 text-richblack-400 underline"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    ) : (
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
                    )
                }


            </div>
            {
                errors.courseImage && (
                    <span className='className="flex items-center text-richblack-5"'>
                        {(video) ? "Please Upload video " : "Please upload thumbnail image"}
                    </span>
                )
            }

        </div>
    )
}

export default Uploader