import React from 'react'

const UsersList = ({user, handlefunction}) => {
  return (
    <div onClick={handlefunction} className='flex items-center justify-start w-full p-3 mb-px text-gray-800 bg-gray-100 border rounded-lg shadow-md cursor-pointer gap-x-4 hover:text-white hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 border-zinc-200 ' >
      <img className='object-cover object-top border border-gray-300 rounded-full ring-blue-400 ring-2 ring-offset-2 h-14 w-14' src={user.avatar} alt="avatar" />
      <div className='flex flex-col gap-y-1'>
        <h4 className='text-lg font-bold capitalize font-open ' >{user.name}</h4>
        <h4 className='text-sm font-medium font-open ' >{user.email}</h4>
      </div>
    </div>
  )
}

export default UsersList
