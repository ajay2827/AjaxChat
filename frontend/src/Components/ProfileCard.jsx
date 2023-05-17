import React, { useRef, useState } from 'react'
import { MdClose } from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ProfileCard = ({user, setProfileshow}) => {

  // toast option
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // set of state
  const[avatar,setAvatar]=useState();
  
  const user1 = useRef();
  user1.current=JSON.parse(localStorage.getItem("userInfo"));
  let token=user1.current.data.token;


   // handle image
   const handleImageUpload = (e) => {
    setAvatar(e.target.files[0])
    const data = new FormData()
    data.append("file", e.target.files[0])
    data.append("upload_preset", "chatapplication")
    data.append("cloud_name","dbb3ojzdl")

    fetch("https://api.cloudinary.com/v1_1/dbb3ojzdl/image/upload",{
            method:"post",
             body: data
         }).then(resp=>resp.json())
         .then(data=>{
          setAvatar(data.url.toString())
         })
        .catch(err=>console.log(err))
  };

  // handle update user avatar
  const handleUpdateAvatar=async()=>{
     
    if(!avatar)
    {
        toast.error('Please select avatar',toastOptions)
        return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data}=await axios.put("https://ajaxchat.onrender.com/api/v1/user/updateavatar",{
        userId:user1.current.data.user._id,
        avatar:avatar
      },config)

      

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='absolute top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-model'>
      <div className='z-50 flex flex-col items-center justify-start p-4 bg-white rounded-md shadow-lg h-model lg:w-pc md:w-pc w-sw1 ' >
      <div onClick={()=>setProfileshow((prev)=>!prev)} className="relative p-1 text-gray-400 bg-transparent rounded-full cursor-pointer lg:left-72 md:left-72 left-40 hover:bg-gray-200 hover:text-gray-900 ">
        <MdClose size={40} />
        </div>

        <div className='-mt-8' >
          <label htmlFor="file input">
        <img className='object-cover object-top border border-gray-200 rounded-full cursor-pointer w-52 h-52' src={!avatar?user.data.user.avatar:avatar} alt="userpic" />
        {/* <button onClick={handleUpdateAvatar} >update</button> */}
        </label>
        </div>

      <h3 className='text-2xl font-medium uppercase mt-7 font-open text-text' >{user.data.user.name}</h3>
      <h3 className='mt-3 text-2xl font-medium text-gray-600 font-open' >{user.data.user.email}</h3>
      <input type="file" onChange={(e)=>handleImageUpload(e)} id="file input" style={{display:'none'}} />
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProfileCard
