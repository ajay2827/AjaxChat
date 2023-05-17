import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch, CiBellOn } from "react-icons/ci";
import {BsFillBellFill} from 'react-icons/bs'
import { ChatState } from "../Context/ChatProvider";


import logo from "../asset/logo.png";
import ProfileCard from "./ProfileCard";
import SideDrawer from "./SideDrawer";
import { chatName } from "../config/appLogic";

const Navbar = () => {
  const navigate = useNavigate();
  const [isopennotification, setIsopennotification] = useState(false);
  const [isopenprofile, setIsopenprofile] = useState(false);
  const [profileshow, setProfileshow] = useState(false);
  const [drawershow, setDrawershow] = useState(false);
  const user = useRef();

  // context set
  const {
    selectchat,
    setSelectchat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  let className1 =
    "relative z-10 bg-white divide-y divide-gray-100 rounded-lg shadow opacity-0 right-16 top-2 w-44 dark:bg-gray-700";
  let className2 =
    "relative z-10 bg-white divide-y divide-gray-100 rounded-lg shadow right-16 top-2 w-44 dark:bg-gray-700";
  let className3 =
    "relative z-10 bg-white divide-y divide-gray-100 rounded-lg shadow opacity-0 top-2 w-44 dark:bg-gray-700";
  let className4 =
    "relative z-10 bg-white divide-y divide-gray-100 rounded-lg shadow right-16 top-3 w-44 dark:bg-gray-700";
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  user.current = userinfo;

  // handle logout functionality
  const handlesignout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // for notification 
  const handlenotification=()=>{
    if(!isopennotification)
    {
      setIsopennotification(true)
      return;
    }

    setNotification([])
    setIsopennotification(false)
  }

  return (
    <div className="flex justify-between w-full h-16 mb-1 lg:h-20 md:h-20 item-center">
     
     {/* search */}
      <div
        onClick={() => setDrawershow((prev) => !prev)}
        className="flex items-center w-40 h-8 p-5 bg-white cursor-pointer lg:w-56 md:w-56 lg:mt-4 md:mt-4 lg:ml-14 md:ml-4 hover:bg-gray-100 gap-x-4 rounded-3xl"
      >
        <CiSearch className="scale-110 " />
        <h4 className="text-base font-Coming text-text">Search...</h4>
      </div>

      {/* logo */}

      <div className="hidden w-auto h-auto lg:block ">
        <img src={logo} alt="logo" className=" w-52" />
      </div>

      {/* notification and profile */}

      <div className="relative flex flex-col items-center ">
        {/* notification */}
        <div className="relative lg:right-8 md:right-8 lg:top-4 md:top-4 top-3 -right-20">
          
          <BsFillBellFill
            onClick={handlenotification}
            className="text-3xl scale-90 cursor-pointer"
            id="dropdownDelayButton"
            data-dropdown-toggle="dropdownDelay"
            data-dropdown-delay="500"
            data-dropdown-trigger="hover"
            style={{color:notification.length!==0?'#FA3E3E':'white'}}
          />
    
          <div className={isopennotification ? className4 : className3}>
            <ul
              className="py-3 text-sm font-normal text-center text-gray-700 font-open dark:text-gray-200"
              aria-labelledby="dropdownDelayButton"
            >
                {!notification.length && "No new Message"}
                {
                  notification?.map((ntf)=>(
                    <li className="block px-2 py-2 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                       {ntf.chat.isGroupChat ? `New Message from ${ntf.chat.chatName}` : `New Message from ${chatName(user.current.data.user,ntf.chat.users)} ` }
                       </li>
                  ))
                }
              
            </ul>
          </div>
        </div>

        {/* avatar */}
        <span className="relative lg:left-7 md:left-7 w-min lg:-top-16 md:-top-16 -top-16 left-32">
          <img
            onClick={() => setIsopenprofile((prev) => !prev)}
            src={user.current.data.user.avatar}
            className="object-cover object-top border-2 border-white rounded-full cursor-pointer w-11 h-11"
            alt="userpic"
          />

          <div className={isopenprofile ? className2 : className1}>
            <ul className="py-2 text-base font-normal text-gray-700 font-open dark:text-gray-200">
              {
                isopenprofile&&(
                  <li
                  onClick={() => setProfileshow((prev) => !prev)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Profile
                </li>
                )
              }
              {isopenprofile && (
                <li
                  onClick={() => handlesignout()}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
        </span>
      </div>
     
      {profileshow && (
        <ProfileCard user={user.current} setProfileshow={setProfileshow} />
      )}
      {drawershow && (
        <SideDrawer setDrawershow={setDrawershow} user={user.current} />
      )}
    </div>
  );
};

export default Navbar;
