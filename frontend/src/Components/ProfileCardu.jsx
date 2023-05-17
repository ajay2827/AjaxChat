import React from 'react'
import { MdClose } from "react-icons/md";

const ProfileCardu = ({user, setProfileshow}) => {
  return (
    <div className='absolute top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen bg-model'>
    <div className='z-50 flex flex-col items-center justify-start p-4 bg-white rounded-md shadow-lg h-model w-pc' >
    <div onClick={()=>setProfileshow((prev)=>!prev)} className="relative p-1 text-gray-400 bg-transparent rounded-full cursor-pointer left-72 hover:bg-gray-200 hover:text-gray-900 ">
      <MdClose size={40} />
      </div>

      <div className='-mt-8' >
      <img className='object-cover object-top border border-gray-200 rounded-full w-52 h-52' src={user.avatar} alt="userpic" />
      </div>

    <h3 className='text-2xl font-medium uppercase mt-7 font-open text-text' >{user.name}</h3>
    <h3 className='mt-3 text-2xl font-medium text-gray-600 font-open' >{user.email}</h3>
    </div>
  </div>
  )
}

export default ProfileCardu
