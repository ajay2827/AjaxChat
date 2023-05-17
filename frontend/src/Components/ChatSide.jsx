import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../Context/ChatProvider";
import { BsPlusLg } from "react-icons/bs";
import SingleChat from "./SingleChat";
import Skeleton from "./Skeleton";
import GroupModel from "./GroupModel";

const ChatSide = ({fetchagain}) => {
  //toastoptions
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // set of state
  const user = useRef();
  const[showgroupmodel,setShowgroupmodel]=useState(false);
  const [loading,setLoading]=useState(false);

  // context state
  const { selectchat, setSelectchat, chats, setChats,showchat } = ChatState();
  const[firstchat,setFirstchat]=useState();
  const[lastchat,setLastchat]=useState()

  // fetch all user chat
  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.current.data.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5500/api/v1/chat",
        config
      );
      setChats(data);
      setFirstchat(data[0]);
      setLastchat(data[data.length-1]);
      setLoading(false);
    } catch (error) {
      toast.error(`${error.response.data.msg}`, toastOptions);
    }
  };

  useEffect(() => {
    user.current = JSON.parse(localStorage.getItem("userInfo"));
    fetchChats();
  }, [fetchagain]);
  
  
 
  let className1=`flex flex-col w-full h-full lg:flex lg:flex-col lg:h-full md:h-full lg:w-1/3 md:w-1/3 gap-y-2 `
  let className2=`hidden w-full h-full  lg:flex lg:flex-col lg:h-full md:h-full lg:w-1/3 md:w-1/3 gap-y-2`
  return (
    <div className={!showchat&&(window.innerWidth<=640)?className1:className2}>
      {/* header */}
      <div className="flex items-center justify-between w-full px-2 lg:h-20 h-14 ">
        <h1 className="text-4xl font-medium tracking-wide text-white lg:text-5xl font-Acme">
          My Chats
        </h1>
        <button onClick={()=>setShowgroupmodel((prev)=>!prev)} className="relative flex items-center justify-center w-24 px-3 py-2 text-base text-center text-white h-9 active:bg-sky-500 top-1 right-1 rounded-xl bg-button hover:bg-opacity-90">
          {" "}
          <BsPlusLg className="mr-2 text-lg font-bold text-white" />{" "}
          <span className="relative font-normal bottom-px font-open ">
            Group
          </span>{" "}
        </button>
      </div>

      {/* user chats */}
      <div className="w-full overflow-x-hidden overflow-y-scroll shadow-md lg:w-full h-m2 shadow-comp bg-comp rounded-xl lg:h-userchats">
        {chats && chats.map((chat) => <SingleChat key={chat._id} chat={chat}  firstchat={firstchat} lastchat={lastchat} user={user} />) }
      </div>
     {
       showgroupmodel&&<GroupModel setShowgroupmodel={setShowgroupmodel} />
     } 
     <ToastContainer/>     
    </div>
  );
};

export default ChatSide;
