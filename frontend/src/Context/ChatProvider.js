import { useEffect, useRef,useContext,useState,createContext } from 'react'
import { useNavigate } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {

    // set of state
    const [selectchat,setSelectchat]=useState([]);
    const [chats,setChats]=useState([]);
    const [notification,setNotification]=useState([]);
    const [showchat,setShowchat]=useState(false)

    return (
        <ChatContext.Provider value={{
            selectchat,setSelectchat,chats,setChats,notification,setNotification,showchat,setShowchat
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider