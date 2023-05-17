import React, { useRef, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {BsArrowLeftShort} from 'react-icons/bs'
import { getUserdp,getAdmindp,chatName,getFulluser } from '../config/appLogic';
import ProfileCardu from './ProfileCardu';
import { ChatState } from "../Context/ChatProvider";
import GroupInfoModel from './GroupInfoModel';

const SelectUserInfo = ({fetchagain,setFetchagain,selectchat,setSelectchat}) => {

    const loggeduser=JSON.parse(localStorage.getItem("userInfo"));

    // set of state
    const[showprofilemodel,setShowprofilemodel]=useState(false);
    const[showgroupmodel,setShowgroupmodel]=useState(false);
    const otheruser=useRef();
    // context set
    const {showchat,setShowchat } = ChatState();

    const handlefunction=()=>{
         if(selectchat.isGroupChat)
         {
            setShowgroupmodel((prev)=>!prev);
            return;
         } 
         otheruser.current=getFulluser(loggeduser.data.user,selectchat.users);
         setShowprofilemodel((prev)=>!prev);
    }
  
    

  return (
    <div className='flex items-center justify-between w-full h-20 pl-8 pr-1 rounded-lg shadow shadow-comp bg-comp ' >

      {/* left */}
      <span className='flex items-center justify-between lg:items-center lg:justify-center md:items-center md:justify-center lg:gap-x-3 md:gap-x-3 gap-x-5 ' >
      <BsArrowLeftShort onClick={()=>setShowchat(false)} className='relative flex text-3xl text-white lg:hidden md:hidden right-5'/>
      <img className="hidden object-cover object-top w-10 h-10 rounded-full lg:block md:block " src={!selectchat.isGroupChat?getUserdp(loggeduser.data.user,selectchat.users):getAdmindp(selectchat)} alt="dp" />
       <h1 className='text-2xl text-center capitalize lg:text-left md:text-left lg:text-lg md:text-lg text-text2 font-Coming' >{!selectchat.isGroupChat?chatName(loggeduser.data.user,selectchat.users):selectchat.chatName}</h1>
      </span>

       {/* right */}
       
       <BsThreeDotsVertical onClick={()=>handlefunction()} className='relative w-12 text-white cursor-pointer h-7'/>
      
       {
         showprofilemodel&&(
            <ProfileCardu user={otheruser.current} setProfileshow={setShowprofilemodel} />
         )
       }
       {
         showgroupmodel&&(
          <GroupInfoModel fetchagain={fetchagain} setFetchagain={setFetchagain} setShowgroupmodel={setShowgroupmodel} />
         )
       }
    </div>
  )
}

export default SelectUserInfo
