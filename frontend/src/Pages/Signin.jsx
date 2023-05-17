import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../asset/logo.png";
import Side from "../asset/sideimage.webp";

const Signin = () => {

  //
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

     const navigate = useNavigate();
    
     // defing state
     const[email,setEmail]=useState();
     const[password,setPassword]=useState();
     const[loading,setLoading]=useState(false);

    const handlesubmit=async(e)=>{
      e.preventDefault();
      setLoading(true);
      if(!email||!password)
      {
        toast.error("Please Fill all the Feilds.", toastOptions);
        setLoading(false)
        return;
      }

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const data=await axios.post('http://localhost:5500/api/v1/user/login',
        {
          email,
          password
        },config)
        console.log(data)
        if(!data)
        {
          toast.warn("User does not exit,Please Sign up", toastOptions);
          setLoading(false)
          return;
        }

        toast.success("Login Successful",toastOptions);
        localStorage.setItem('userInfo',JSON.stringify(data));
        setLoading(false)
        setTimeout(() => {
          navigate("/chats");
        }, '1500');

      } catch (error) {
        console.log(error)
        toast.error(`${error.response.data.msg}`, toastOptions);
        setLoading(false);
      }

    }

  return (
    <div className="flex flex-col items-center w-full h-screen px-12 pt-10 pb-4 lg:pt-2 md:pt-2 md:items-start lg:items-start bg-homeprimary">

      <div className="relative lg:top-4 md:top-4 ">
        <img src={Logo} alt="logo" className="w-48 lg:w-52 md:w-44" />
      </div>

      <div className="flex items-start justify-center w-full h-full mt-5 lg:items-center md:items-center gap-x-12 md:mt-5 lg:mt-0">
        <div className="hidden w-1/2 lg:flex md:flex lg:pl-20 md:pl-10 ">
          <img
            src={Side}
            alt="avatar"
            className="origin-center lg:scale-110 lg:w-sw md:w-sw1 md:scale-125"
          />
        </div>
        {/* signin */}
        <div className="relative w-full h-full pt-4 lg:w-1/2 md:w-1/2 lg:left-10 md:left-5 ">
          <form onSubmit={handlesubmit} className="flex flex-col px-8 pt-5 pb-4 bg-white rounded-lg lg:h-full md:h-full gap-y-3 justify-items-center shadow-black lg:w-rw md:w-rw1">
            <h1 className="px-8 mb-2 text-5xl font-bold tracking-wide scale-90 lg:text-5xl md:text-4xl md:scale-110 text-opacity-40 text-textred text-start font-head ">
              Sign
              <span className="text-4xl font-normal tracking-normal lg:text-4xl md:text-3xl"> in</span>{" "}
            </h1>

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
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            {/* password */}
            <div className="relative px-4 mb-1 lg:px-8 md:px-6">
              <label htmlFor="required-email" className="text-xs text-gray-700 lg:text-base md:text-sm">
                Password
                <span className="text-red-500 required-dot">*</span>
              </label>
              <input
                type="password"
                id="required-email"
                className="flex-1 w-full mt-1 text-xs text-gray-700 placeholder-gray-600 bg-gray-200 bg-opacity-75 border border-transparent rounded-lg shadow-sm appearance-none lg:px-4 lg:py-2 md:px-2 md:py-1 lg:text-base md:text-sm border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent"
                placeholder="Enter password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            {/* button */}
            <div className="relative px-4 mb-1 lg:px-8 md:px-6 ">
              <button
                type="submit"
                className="text-white w-20 py-2 px-2  lg:w-28 md:w-20 bg-homeprimary hover:bg-opacity-90 focus:outline-none focus:ring-4 font-medium rounded-full  text-sm lg:px-5 md:px-3 lg:py-2.5 md:py-2 text-center mr-2 mb-2 "
              >
                Sign in
              </button>
            </div>
            <p className="text-sm text-center text-gray-700 lg:text-base md:text-base">Don't have an account? <Link className="font-bold text-textred font-head" to='/'>Sign Up </Link> </p>

          </form>
    
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signin;
