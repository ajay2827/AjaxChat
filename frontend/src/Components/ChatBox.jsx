import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SingleChatBox from './SingleChatBox';
import ChatBoxLoading from '../config/ChatBoxLoading';

const ChatBox = ({fetchagain,setFetchagain}) => {
  
  // context set
  const { selectchat, setSelectchat, chats, setChats,showchat } = ChatState();
 
  let className1=`hidden w-full h-full lg:flex lg:w-2/3 md:w-2/3 md:flex`
  let className2=`w-full h-full  flex lg:flex lg:w-2/3 md:w-2/3 md:flex`
  return (
    <div className={showchat&&(window.innerWidth<=640)?className2:className1} >
    {
      selectchat.length!==0?(<SingleChatBox fetchagain={fetchagain} setFetchagain={setFetchagain}/>):(<ChatBoxLoading/>)
    }
    </div>
  )
}

export default ChatBox
