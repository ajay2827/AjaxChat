import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender,isLastMessage,messageCurrmessage,isSameUser } from '../config/appLogic'

const ScrollableChat = ({message,curruser}) => {
  return (
    <ScrollableFeed className="relative flex flex-col w-full h-full overflow-y-scroll ">
      {
        message&&message.map((m,i)=>(
            <div key={m._id} className='flex' >
                 {/* show avatar of other user */}
                 {
                     (isSameSender(message, m, i, curruser._id)||isLastMessage(message, i,curruser._id ))?(
                         <img src={m.sender.avatar} alt="pic" className='object-cover object-top w-8 h-8 rounded-full'/>
                     ):(
                      <div className='w-8 h-8 rounded-full' ></div>
                     )
                 }
                 {
                    messageCurrmessage(m,curruser._id)?(
                        <span style={{marginTop:isSameUser(message, m, i, curruser._id)?'2px':'20px'}} className='relative p-2 ml-auto text-xs tracking-wider text-left text-white rounded-bl-md rounded-tl-md rounded-tr-md font-Coming right-2 max-w-mw bg-comp1'>{m.content}</span>
                    ):(<span style={{marginTop:isSameUser(message, m, i, curruser._id)?'2px':'20px'}} className='p-2 ml-1 text-xs tracking-wider text-left text-white border-2 border-blue-700 rounded-br-md rounded-tl-md rounded-tr-md font-Coming max-w-mw bg-comp bg-opacity-80'>{m.content}</span>)
                 }
                  
            </div>
            
        ))
      }
    </ScrollableFeed>
  )
}

export default ScrollableChat
