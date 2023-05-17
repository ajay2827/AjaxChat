import React, { useState } from "react";
import Navbar from '../Components/Navbar'
import ChatSide from '../Components/ChatSide'
import ChatBox from '../Components/ChatBox'

const Chats = () => {
  const [fetchagain,setFetchagain]=useState(false);

  return (
    <div className="flex flex-col w-full h-full py-5 bg-bg px-7">
      <Navbar  />
      <div className="flex items-start justify-between w-full lg:px-6 md:px-6 h-chatside lg:gap-x-3">
      {/* left side */}
         <ChatSide fetchagain={fetchagain} />      
      {/* right side               */}
         <ChatBox fetchagain={fetchagain} setFetchagain={setFetchagain}  />        
      </div>
    </div>
  );
};

export default Chats;
