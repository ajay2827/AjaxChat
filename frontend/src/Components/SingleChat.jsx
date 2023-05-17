import React, { useRef } from "react";
import { chatName, getUserdp, getAdmindp } from "../config/appLogic";
import { ChatState } from "../Context/ChatProvider";


const SingleChat = ({ chat, firstchat, lastchat }) => {
  // context state
  const { selectchat, setSelectchat , showchat,setShowchat} = ChatState();
  const user = useRef();
  let className = "flex items-center justify-between w-full h-20 px-8 py-3 border-b cursor-pointer text-text2 border-bg bg-comp hover:text-white hover:bg-gradient-to-tl hover:to-indigo-600 hover:via-sky-600 hover:from-sky-500 gap-x-4";
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  user.current = userinfo;
  
  const selectchathandle=()=>{
    setSelectchat(chat)
    setShowchat(true)
  }
  const month=new Map([
    [1,'Jan'],
    [2,'Feb'],
    [3,'March'],
    [4,'April'],
    [5,'May'],
    [6,'June'],
    [7,'July'],
    [8,'August'],
    [9,'Sept'],
    [10,'Oct'],
    [11,'Nov'],
    [12,'Dec']

  ])

  
  return (
    <div onClick={selectchathandle} className={className} style={{backgroundColor:chat._id===selectchat._id&&'#1D75DD',color:chat._id===selectchat._id&&'white'}} >

      <div className="flex items-center justify-start gap-x-4">
      <img
        className="object-cover object-top rounded-full w-11 h-11 "
        src={
          !chat.isGroupChat ? (
            getUserdp (user.current.data.user, chat.users)
          ) : (
            getAdmindp (chat) 
          )
        }
        alt="avatar"
      />
      <div className="flex flex-col items-start justify-center py-2 gap-y-1" >
      <h2 className="text-base text-left capitalize font-Coming" >
          {!chat.isGroupChat ? (
            chatName (user.current.data.user,chat.users )
          ) : (
            chat.chatName
          )}
        </h2>
        <h2 className="text-xs font-medium text-left font-Coming text-opacity-90" >{!chat.latestMessage?`msg`:`${chat.latestMessage.content}`}</h2>
      </div>
      </div>

      {/* timing */}
      <div className="text-xs font-normal text-right font-Coming" >
        {`${new Date(chat.updatedAt).getDate()} ${month.get(new Date(chat.updatedAt).getMonth())} ${new Date(chat.updatedAt).getFullYear()}`}
      </div>
    </div>
  );
};

export default SingleChat;
