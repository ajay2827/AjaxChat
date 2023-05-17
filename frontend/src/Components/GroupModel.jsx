import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";
import Spinner from '../config/Spinner';
import UsersList from './UsersList';
import UserBadge from './UserBadge';
import {BsPersonCircle} from 'react-icons/bs'
import {ChatState} from '../Context/ChatProvider'


const GroupModel = ({setShowgroupmodel,user}) => {
      
    // toast option
    const toastOptions = {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      };

    // set of state
   const[groupname,setGroupname]=useState();
   const [searchuser,setSearchuser]=useState();
   const [searchresult,setSearchresult]=useState();
   const [participant,setParticipant]=useState([]);
   const [avatar,setAvatar]=useState();
   const [loading,setLoading]=useState(false);
  
  // context state
  const {selectchat,setSelectchat,chats,setChats} = ChatState();


  // handle group avatar
  const handleImageUpload = (e) => {
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
         })
        .catch(err=>console.log(err))
  };


   // handle search
   const handlesearch=async(query)=>{
         if(!query)
         {
            return;
         }
         setSearchuser(query);
         try {
            setLoading(true);
            const config = {
                headers: {
                  Authorization: `Bearer ${user.data.token}`,
                },
              };
            const {data}=await axios.get(`http://localhost:5500/api/v1/user?search=${searchuser}`, config);
            
            setSearchresult(data);
            setLoading(false);
         } catch (error) {
            toast.error(`${error.response.data.msg}`, toastOptions);
         }
   }

   // set group member
   const handleGroup=(user)=>{
     if(participant.includes(user))
     {
      toast.error("User already added!!!");
      return;
     }

     setParticipant([...participant,user]);
    
   }

   // create group chat
   
   const creategroup=async(e)=>{
    e.preventDefault();
     if(!groupname||!participant||!avatar)
     {
         toast.error("Please fill all the feilds",toastOptions);
         return;
     }
     try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      
      const {data}=await axios.post("http://localhost:5500/api/v1/chat/group",{
        groupname:groupname,
        avatar:avatar ,
        participant:JSON.stringify(participant.map((user)=>user._id))
      },config);

      setChats([data,...chats]);
      toast.success("Group Chat Created!",toastOptions);

     } catch (error) {
        toast.error(`${error.response.data.msg}`)      
     }     
   }


  return (
    <div className='absolute top-0 left-0 right-0 flex items-start justify-center w-full h-full bg-model' >
        
        <div className='z-50 flex flex-col items-center justify-start p-4 origin-top translate-y-16 bg-white rounded-lg shadow-lg gap-y-2 min-h-groupmodel w-gm ' >

      {/* heading */}
       <div className='flex items-center w-full text-4xl font-semibold tracking-wide font-Acme text-text1' >
        <h1 className='ml-auto'>Create Group Chat</h1>
        <span onClick={()=>setShowgroupmodel((prev)=>!prev)} className="relative p-1 ml-auto text-gray-400 bg-transparent rounded-full cursor-pointer hover:bg-gray-200 hover:text-gray-900 ">
          <MdClose size={40}/>
        </span>
       </div>
       
       {/* form */}
       <form onSubmit={creategroup} className='flex flex-col items-center w-full mt-3 gap-y-3'>
          {/* chatname */}
          <input onChange={(e)=>setGroupname(e.target.value)} type="text" className="bg-gray-50 font-open font-medium  border w-80 border-gray-400 placeholder:text-gray-600 text-gray-900  text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Group Name" />

          {/* search user */}
          <input onChange={(e)=>handlesearch(e.target.value)}  type="text" className="bg-gray-50 font-open font-medium  border w-80 border-gray-400 placeholder:text-gray-600 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Search by name or email" />
         
           {/* Group dp */}
           
           <input className="text-sm text-gray-900 bg-gray-200 rounded-lg cursor-pointer w-80"
               id="required-avatar"
               type="file"
               onChange={(e) => handleImageUpload(e)}
              />


          {/* show selected user */}
          <div className='flex flex-wrap w-full gap-2 px-5 mt-1' >
             {
               participant?.map((user)=>(
                 <UserBadge  key={user._id} user={user}  />
               ))
             }
          </div>

          {/* search result */}
          <div className='w-full px-10 overflow-scroll max-h-56' > 
          <div className='flex flex-col ' >
            {
               loading?<Spinner/>:(
                searchresult?.map((user)=>(
                    <UsersList
                     key={user._id}
                     user={user}
                     handlefunction={() => handleGroup(user)}
                    />
                ))
               )
            }
          </div>
          
          </div>
          
          {/* button */}
          <button className='w-32 h-10 px-3 py-1 text-lg text-center text-white active:bg-sky-500 rounded-xl bg-button hover:bg-opacity-90' type='submit'>Create Group</button>
    
       </form>             
 
        </div>
   
    </div>
  )
}

export default GroupModel
