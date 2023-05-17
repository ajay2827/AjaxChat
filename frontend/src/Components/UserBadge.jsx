import React from 'react'

const UserBadge = ({user}) => {
  return (
    <div className='flex justify-around px-4 py-2 text-base font-medium text-center text-white capitalize scale-90 bg-green-500 cursor-pointer hover:bg-green-400 rounded-xl font-open' >
       {user.name}
    </div>
  )
}

export default UserBadge
