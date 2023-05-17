import React, { useEffect, useRef, useState } from 'react'
import Spinner from '../config/Spinner';
import { ChatState } from '../Context/ChatProvider'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import ScrollableChat from './ScrollableChat';


const { io } = require("socket.io-client");
let socket,compareSelectedChat;

const MainChatBox = ({fetchagain,setFetchagain}) => {

   // toast option
   const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

   // context set
  const { selectchat, setSelectchat, chats, setChats,notification,setNotification } = ChatState();
  
  // set of state
   const [newmessage,setNewmessage]=useState("");
   const [message,setMessage]=useState([]);
   const [loading,setLoading]=useState(false);
   const [socketconnection,setSocketconnection]=useState(false);
   const [typing,setTyping]=useState(false);
   const [istyping,setIstyping]=useState(true);
   const user = useRef();
  user.current=JSON.parse(localStorage.getItem("userInfo"));
  let token=user.current.data.token;
  
  
  const fetchmessage=async()=>{
    if(!selectchat) return;
    try {
      setLoading(true);
       const config={
        headers:{
          Authorization: `Bearer ${token}`
        }
       }
       const {data}=await axios.get(`https://ajaxchat.onrender.com/api/v1/message/${selectchat._id}`,config)
       setMessage(data);
       setLoading(false);

       //creating room of selected chat 
       socket.emit('joinroom',selectchat._id)
    } catch (error) {
      toast.error("Error!!!", toastOptions);
    }
  }


   const handleSubmit=async(e)=>{
    e.preventDefault()
    if(newmessage)
    {
      try {
        const config={
          headers:{
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
        setNewmessage("");
        const {data}=await axios.post(`https://ajaxchat.onrender.com/api/v1/message`,{
            content:newmessage,
            chatId:selectchat
          },config)
     
        // sending message 
        socket.emit('new message',data)
        setMessage([...message,data])
      } catch (error) {
        toast.error("Error!!!", toastOptions);
      }
    }
   }
  
   useEffect(()=>{
    // connection from frontend to backend
    socket=io("https://ajaxchat.onrender.com")
    socket.emit("setup",user.current.data.user)
    socket.on("connected",()=>setSocketconnection(true))
    socket.on("typing",()=>setIstyping(true))
    socket.on("stop typing",()=>setIstyping(false))
 },[])

   
   useEffect(()=>{
       fetchmessage();
       compareSelectedChat=selectchat
   },[selectchat])


   useEffect(()=>{
       socket.on('message recieved',(newMessageRecieved)=>{
            if(!compareSelectedChat||compareSelectedChat._id!==newMessageRecieved.chat._id) 
            {
               if(!notification.includes(newMessageRecieved))
               {
                 setNotification([newMessageRecieved,...notification])
                 setFetchagain(!fetchagain)
               }
            }
            else
            {
              setMessage([...message,newMessageRecieved])
            }
       })
   })

   
  const typeHandler=(e)=>{
    setNewmessage(e.target.value)

    if(!socketconnection) return;
    
    if(!typing)
    {
      setTyping(true)
      socket.emit("typing",selectchat._id)
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectchat._id);
        setTyping(false);
      }
    }, timerLength);

  }


  return (
    <div className='flex flex-col w-full px-3 py-2 rounded-lg shadow gap-y-2 shadow-comp bg-comp h-userchats' >
      {/* message box */}
      <div className='relative flex items-center justify-center w-full h-m'>
      {
        loading?(
          <Spinner />
        ):( <ScrollableChat  message={message} curruser={user.current.data.user}/> )
      }
      </div>

      {/* writing message */}
      <div className='w-full h-sm'>
      <form  onSubmit={handleSubmit} className='flex items-center justify-between w-full h-full gap-x-2' >
        <input value={newmessage}  onChange={(e)=>typeHandler(e)} type="text" placeholder='write a message...' className='w-full h-full text-white border-2 border-white rounded bg-opacity-20 bg-comp1 font-Coming placeholder:text-white placeholder:text-opacity-90' />
        <span>
          <label htmlFor="text">
          <button className='relative flex items-center justify-center w-16 px-1 py-1 text-base text-center text-white h-9 active:bg-sky-500 top-1 right-1 rounded-xl bg-button hover:bg-opacity-90' type='submit'>Send</button>
          </label>
        </span>
      </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default MainChatBox
