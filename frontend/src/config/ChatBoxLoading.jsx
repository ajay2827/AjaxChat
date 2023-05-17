import React from 'react'
import s1 from '../asset/s1.png'

const ChatBoxLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full rounded-lg shadow gap-y-2 shadow-comp bg-comp' >
      <img src={s1} alt="robo" className='scale-150 w-96' />
      <h4 className='py-2 text-3xl font-medium text-center text-white bg-gradient-to-tl from-blue-600 via-sky-500 to-sky-400 rounded-2xl w-96 font-Coming' >Click user to chat!!!</h4>
    </div>
  )
}
  
export default ChatBoxLoading
