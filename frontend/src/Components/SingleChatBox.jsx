import React from 'react'
import SelectUserInfo from './SelectUserInfo'
import MainChatBox from './MainChatBox'
import { ChatState } from '../Context/ChatProvider'

const SingleChatBox = ({fetchagain,setFetchagain}) => {
   
    // context set
  const { selectchat, setSelectchat, chats, setChats } = ChatState();

  return (
    <div className='flex flex-col w-full h-full gap-y-2' >
       
       {/* select user info */}
        <SelectUserInfo fetchagain={fetchagain} setFetchagain={setFetchagain} selectchat={selectchat} setSelectchat={setSelectchat}/>

       {/* Main Chat Box */}
       <MainChatBox fetchagain={fetchagain} setFetchagain={setFetchagain} />
    </div>
  )
}

export default SingleChatBox
