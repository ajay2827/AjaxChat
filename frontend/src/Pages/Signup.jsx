import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../asset/logo.png";
import Side from "../asset/sideimage.webp";

const Signup = () => {
  //
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // toast.error(
  //   "Password should be equal or greater than 8 characters.",
  //   toastOptions
  // );

  const navigate = useNavigate();
  //  difining state
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [avatar,setAvatar]=useState();
  const [loading, setLoading] = useState(false);
  
  // handle image
  const handleImageUpload = (e) => {
    setPic(e.target.files[0])
    console.log(e.target.files[0])
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
          console.log(1,data.url.toString())
         })
        .catch(err=>console.log(err))
  };

  // handle form
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // checking  feild
    if (!name || !email || !password || !confirmpassword) {
      toast.error("Please Fill all the Feilds.", toastOptions);
      setLoading(false);
      return;
    }

    // confirm password
    if (password !== confirmpassword) {
      toast.error("Passwords Do Not Match", toastOptions);
      setLoading(false);
      return;
    }
   
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(2,avatar)
    try {
      const data = await axios.post("https://ajaxchat.onrender.com/api/v1/user", {
        name,
        email,
        password,
        avatar:avatar

      },config);
      console.log(data)
      if (!data) {
        toast.error("Error Occured!", toastOptions);
        setLoading(false);
        return;
      }
    
      toast.success("Registration Successful", toastOptions);
      localStorage.setItem('userInfo',JSON.stringify(data))
      setLoading(false);
      setTimeout(() => {
        navigate("/chats");
      }, '1500');
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.msg}`, toastOptions);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen px-12 pt-8 pb-4 lg:pt-2 md:pt-2 md:items-start lg:items-start bg-homeprimary">

       {/* logo */}
      <div className="relative lg:top-4 md:top-4 ">
        <img src={Logo} alt="logo" className="w-48 lg:w-52 md:w-44" />
      </div>
       
       {/* container */}
      <div className="flex items-start justify-center w-full h-full lg:items-center md:items-center gap-x-12 md:mt-5 lg:mt-0">
        
        {/* vector image */}
        <div className="hidden w-1/2 lg:flex md:flex lg:pl-20 md:pl-10">
          <img
            src={Side}
            alt="avatar"
            className="origin-center lg:scale-110 lg:w-sw md:w-sw1 md:scale-125"
          />
        </div>

        
        {/* signin */}
        <div className="relative w-full h-full pt-4 lg:w-1/2 md:w-1/2 lg:left-10 md:left-5">
          <form
            className="flex flex-col px-8 pt-5 pb-4 bg-white rounded-lg lg:h-full md:h-m1 gap-y-3 justify-items-center shadow-black lg:w-rw md:w-rw1"
            onSubmit={handlesubmit}
          >
            <h1 className="px-8 mb-2 text-5xl font-bold tracking-wide scale-90 lg:text-5xl md:text-4xl md:scale-110 text-opacity-40 text-textred text-start font-head">
              Sign
              <span className="text-4xl font-normal tracking-normal lg:text-4xl md:text-3xl">
                {" "}
                up
              </span>{" "}
            </h1>

            {/* name */}
            <div className="relative px-4 mb-1 lg:px-8 md:px-6 ">
              <label htmlFor="required-name" className="text-xs text-gray-700 lg:text-base md:text-sm">
                Name
                <span className="text-red-500 required-dot">*</span>
              </label>
              <input
                type="text"
                id="required-name"
                className="flex-1 w-full mt-1 text-xs text-gray-700 placeholder-gray-600 bg-gray-200 bg-opacity-75 border border-transparent rounded-lg shadow-sm appearance-none lg:px-4 lg:py-2 md:px-2 md:py-1 lg:text-base md:text-sm border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* email */}

            <div className="relative px-4 mb-1 lg:px-8 md:px-6 ">
              <label htmlFor="required-email" className="text-xs text-gray-700 lg:text-base md:text-sm">
                Email
                <span className="text-red-500 required-dot">*</span>
              </label>
              <input
                type="email"
                id="required-email"
                className="flex-1 w-full mt-1 text-xs text-gray-700 placeholder-gray-600 bg-gray-200 bg-opacity-75 border border-transparent rounded-lg shadow-sm appearance-none lg:px-4 lg:py-2 md:px-2 md:py-1 lg:text-base md:text-sm border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* password */}
            <div className="relative px-4 mb-1 lg:px-8 md:px-6 ">
              <label htmlFor="required-password" className="text-xs text-gray-700 lg:text-base md:text-sm">
                Password
                <span className="text-red-500 required-dot">*</span>
              </label>
              <input
                type="password"
                id="required-password"
                className="flex-1 w-full mt-1 text-xs text-gray-700 placeholder-gray-600 bg-gray-200 bg-opacity-75 border border-transparent rounded-lg shadow-sm appearance-none lg:px-4 lg:py-2 md:px-2 md:py-1 lg:text-base md:text-sm border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* confirm password */}
            <div className="relative px-4 mb-1 lg:px-8 md:px-6">
              <label htmlFor="required-cpassword" className="text-xs text-gray-700 lg:text-base md:text-sm">
                Confirm Password
                <span className="text-red-500 required-dot">*</span>
              </label>
              <input
                type="password"
                id="required-cpassword"
                className="flex-1 w-full mt-1 text-xs text-gray-700 placeholder-gray-600 bg-gray-200 bg-opacity-75 border border-transparent rounded-lg shadow-sm appearance-none lg:px-4 lg:py-2 md:px-2 md:py-1 lg:text-base md:text-sm border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
                placeholder="Enter password"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>

            {/* avatar */}
            <div className="relative px-4 mb-1 lg:px-8 md:px-6 ">
              <label htmlFor="required-avatar" className="text-xs text-gray-700 lg:text-base md:text-sm">
                Avatar
                <span className="text-red-500 required-dot">*</span>
              </label>

              
              <input className="block w-full text-xs text-gray-900 bg-gray-200 bg-opacity-75 rounded-lg cursor-pointer lg:text-sm md:text-xs "
               id="required-avatar"
               type="file"
               onChange={(e) => handleImageUpload(e)}
              /> 

            </div>

            {/* button */}
            <div className="relative px-4 mb-1 lg:px-8 md:px-6">
              <button
                type="submit"
                className="text-white w-20 py-2 px-2  lg:w-28 md:w-20 bg-homeprimary hover:bg-opacity-90 focus:outline-none focus:ring-4 font-medium rounded-full  text-sm lg:px-5 md:px-3 lg:py-2.5 md:py-2 text-center mr-2 mb-2 "
              >
                Sign up
              </button>
            </div>
            <p className="text-sm text-center text-gray-700 lg:text-base md:text-base">Have an account? <Link className="font-bold text-textred font-head" to='/signin'>Sign-in</Link> </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
