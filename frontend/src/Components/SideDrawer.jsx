import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "./Skeleton";
import UsersList from "./UsersList";
import {ChatState} from '../Context/ChatProvider'

const SideDrawer = ({ setDrawershow, user }) => {

  //toastoptions
  const toastOptions1 = {
    position: "top-left",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const toastOptions2 = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // set of state
  const [searchusers, setSearchusers] = useState();
  const [searchresult,setSearchresult]= useState();
  const [loading, setLoading] = useState(false);
  
  // context state
  const {selectchat,setSelectchat,chats,setChats} = ChatState();

  // handle users search option
  const handlesubmit = async () => {
    
    if(!searchusers)
    {
      toast.warning("Please Fill all the Feilds",toastOptions1)
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(
        `https://ajaxchat.onrender.com/api/v1/user?search=${searchusers}`,
        config
      );

      setSearchresult(data);
      
      setLoading(false);

    } catch (error) {
      toast.warning("Failed to Load the Search Results", toastOptions1);
      setLoading(false);
    }
  };
  

  // handle select user function
  const selectChat=async(userId)=>{
    
     try {
      const config={
        headers:{
          "Content-type": "application/json",
          Authorization:`Bearer ${user.data.token}`
        }
      }
      const {data}=await axios.post('http://localhost:5500/api/v1/chat',{userId},config);
      if(!chats.find((c)=>c._id===data._id))
      {
        setChats([data,...chats]);
      }
      setSelectchat(data); 
     } catch (error) {
      toast.error(`${error.response.data.msg}`, toastOptions2);
     }
  }


  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full bg-model">
        
      <div className="z-50 flex flex-col items-center justify-start h-full p-4 bg-white shadow-2xl rounded-r-xl w-80" >
       
        {/* close button */}
      <div className="flex items-center justify-between w-full p-2">
        <h2 className="text-2xl font-semibold tracking-normal font-open text-text1">
          Search Users
        </h2>
        <div
          onClick={() => setDrawershow((prev) => !prev)}
          className="relative p-1 text-gray-400 bg-transparent rounded-full cursor-pointer top-1 hover:bg-gray-200 hover:text-gray-900 "
        >
          <MdClose size={30} />
        </div>
      </div>

      {/* divider */}
      <hr className="w-full h-px my-3 bg-gray-200 border-0 " />
      {/* input */}
      <div>
    
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="relative w-5 h-5 text-gray-500 top-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              onChange={(e) => setSearchusers(e.target.value)} 
              className="block p-4 pl-10 text-lg font-normal text-gray-700 border border-gray-300 rounded-lg placeholder:text-text placeholder:text-sm font-open w-72 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search by name or email"
              required
            />
            <button
              onClick={() => handlesubmit()}
              className="text-white absolute right-2.5 bottom-2.5 bg-button hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
      </div>

      {/* search user */}
      <div className="h-full mt-3 overflow-x-hidden overflow-y-scroll w-72" >

      {loading ? <Skeleton /> :(
        searchresult?.map((user)=>(
          <UsersList
            key={user._id}
            user={user}
            handlefunction={()=>selectChat(user._id)}
          />
        ))
      )}

      </div>
      <ToastContainer />

      </div>
    </div>
  );
};

export default SideDrawer;
