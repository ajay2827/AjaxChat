import {Routes, Route } from "react-router-dom";
import "./App.css";

// importing pages
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Chats  from "./Pages/Chats";

const App=()=> {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-bg">
     <Routes>
     {/* signup route */}
      <Route path='/' element={<Signup/>}/>   
      {/* signin route */}
      <Route path='/signin' element={<Signin/>} /> 
      {/* chats route */}
      <Route path='/chats' element={<Chats/>}/>   
     </Routes>
    </div>
  );
}

export default App;
