import React, { useEffect, useRef, useState } from "react";
import IconBtn from "../../../comman/IconBtn";
import {FiUpload} from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../../../services/operations/settingAPI";

const ProfileImage = ({ userDetails }) => {

  
  console.log(userDetails.image);
  const {token } = useSelector((state)=> state.auth)
  
  const [prevImage, setPrevImage] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()
  const [imageFile, setImageFile] = useState(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };
  const handleUploadImage = ()=> {
    try {
        const formData = new FormData();
        formData.append('image' ,imageFile )
        dispatch(uploadImage(formData,token))
    }catch(error) {

    }
  }
  useEffect(() => {

    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
  return (
    <div className="w-full bg-richblack-800 border border-richblack-700 rounded-md shadow-md">
      <div className="flex py-4 px-6 gap-8">
        <img
          alt=""
          src={prevImage || userDetails.image}
          width={"100px"}
          height={"50"}
          className="rounded-full h-[100px] object-cover cursor-pointer"
        />
        <div className="mt-4 ">
          <p className="text-xl font-normal">Change Profile Image</p>
          <div className="flex gap-4 mt-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>
            <IconBtn name={"Upload"} onclick={handleUploadImage} >
                <FiUpload/>
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
