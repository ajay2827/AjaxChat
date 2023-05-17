import axios from 'axios';
import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";
import { ChatState } from '../Context/ChatProvider'
import UserBadge from './UserBadge';
import Spinner from '../config/Spinner';
import UsersList from './UsersList';


const GroupInfoModel = ({fetchagain,setFetchagain,setShowgroupmodel}) => {
  
  // toast option
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  
  const user = useRef();
  user.current=JSON.parse(localStorage.getItem("userInfo"));
  let token=user.current.data.token;
  

  // set of state
  const[groupname,setGroupname]=useState();
  const [searchuser,setSearchuser]=useState();
  const [searchresult,setSearchresult]=useState();
  const [loading,setLoading]=useState();
   
  // context set
  const { selectchat, setSelectchat, chats, setChats } = ChatState();
  console.log("Chat",chats);
  // search user 
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
             Authorization: `Bearer ${token}`,
           },
         };
       const {data}=await axios.get(`https://ajaxchat.onrender.com/api/v1/user?search=${searchuser}`, config);
       console.log(data);
       setSearchresult(data);
       setLoading(false);
    } catch (error) {
       toast.error(`${error.response.data.msg}`, toastOptions);
    }
     
  }
  
  // handle group
  const UpdateGroupMember=async(user)=>{
        
    if(selectchat.users.find((u)=>u._id===user._id))
    {
      toast.error("User already added!!!",toastOptions);
      return;
    }

         try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const {data}=await axios.put('https://ajaxchat.onrender.com/api/v1/chat/adduser',{
            chatId:selectchat._id,
            userId:user._id,
          },config);
          setSelectchat(data);
          setFetchagain(!fetchagain);
          setLoading(false);
         } catch (error) {
          toast.error(error,toastOptions)
          
         }
  }
       // rename the group
        
       const renameGroup=async(e)=>{
        e.preventDefault();
              if(!groupname)
              {
                toast.error("Please fill group name",toastOptions);
                return;
              }
              try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                
                const {data}=await axios.put('https://ajaxchat.onrender.com/api/v1/chat/rename',
                {
                  groupId:selectchat._id,
                  groupName:groupname
                },config);

                setSelectchat(data);
                setFetchagain(!fetchagain);
                toast.success("Update Group Name",toastOptions);
              } catch (error) {
                 toast.error("Error!!",toastOptions);
              }
       }
        
       // leave group

       const leavegroup=async()=>{
             try {
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };

              const {data}=await axios.put('https://ajaxchat.onrender.com/api/v1/chat/remove',{
                groupId:selectchat._id,
                userId:user.current.data.user._id
              },config);
              const newchat=chats.filter((u)=>u._id!==selectchat._id);
              setChats(newchat);
              setSelectchat();
              toast.success("Successfully Leave group",toastOptions);
             } catch (error) {
              toast.error("Error!!!");
             }
       }

  return (
    <div className='absolute top-0 left-0 right-0 z-50 flex items-start justify-center w-full h-full bg-model' >
      <div className='z-50 flex flex-col items-center justify-start p-4 origin-top bg-white rounded-lg shadow-lg translate-y-28 gap-y-3 min-h-groupmodel lg:w-gm md:w-gm w-sw1' >
        
        {/* Group Name */}
        <div className='flex items-center w-full text-4xl font-semibold tracking-wide font-Acme text-text1' >
          <h1 className='ml-auto'>{selectchat.chatName}</h1>
        <span onClick={()=>setShowgroupmodel((prev)=>!prev)} className="relative p-1 ml-auto text-gray-400 bg-transparent rounded-full cursor-pointer justify-self-end hover:bg-gray-200 hover:text-gray-900 ">
          <MdClose size={40}/>
        </span>
       </div> 

       {
          user.current.data.user._id!==selectchat.groupAdmin._id&&(
            <img className='object-cover object-top border border-gray-500 rounded-full w-52 h-52' src={selectchat.avatarGroup} alt="groupdp" />
          )
       }
       
        {/* show group member */}
        <div className='flex flex-wrap w-full gap-2 px-8 mb-1' >
        {
               selectchat.users?.map((user)=>(
                 <UserBadge  key={user._id} user={user}  />
               ))
             }
        </div>
            
            {
              user.current.data.user._id===selectchat.groupAdmin._id&&(<div className='flex flex-col items-center justify-center w-full px-10 gap-y-2' >
         
              {/* form for group name update */}
            <form onSubmit={renameGroup} className='flex items-center justify-start w-full lg:gap-x-2 md:gap-x-2 ' >
            <input onChange={(e)=>setGroupname(e.target.value)} type="text" className="bg-gray-50 font-open scale-90 font-medium  border w-80 border-gray-400 placeholder:text-gray-600 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Update group name" />
             <button type='submit' className='w-24 px-2 py-2 text-sm font-medium text-center text-white scale-90 rounded-md lg:text-base md:text-base hover:opacity-90 bg-button font-Acme' >Update</button>
            </form>
            
            {/* form to add user in the group */}
            <form className='flex items-center justify-start w-full'>
            <input onChange={(e)=>handlesearch(e.target.value)}  type="text" className="bg-gray-50 scale-90 font-open font-medium  border w-80 border-gray-400 placeholder:text-gray-600 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="Search by name or email" />
            </form>
    
            </div>)
            }
            
              
            
        
         {/* search result */}
         <div className='w-full px-10 overflow-scroll max-h-64' >
         <div className='flex flex-col w-full' >
            {
               loading?<Spinner/>:(
                searchresult?.map((user)=>(
                    <UsersList
                     key={user._id}
                     user={user}
                     handlefunction={() => UpdateGroupMember(user)}
                    />
                ))
               )
            }
          </div>
         </div>
          {
            user.current.data.user._id!==selectchat.groupAdmin._id&&(<button onClick={()=>leavegroup()} className='px-2 py-2 text-lg font-medium text-center text-white bg-red-500 rounded-md w-28 hover:opacity-90 font-Acme'  >Leave Group</button>)
          }
          
      </div>
    </div>
  )
}
  
export default GroupInfoModel
