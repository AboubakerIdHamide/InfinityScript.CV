import React from 'react'

const Input = ({placeholder}) => {
  return (
    <>
        <input type="text" placeholder={placeholder} className='rounded-lg text-[#ABAFB1] bg-[#EFF1F9] border-0 p-[10px] focus:ring-0 placeholder-[#ABAFB1]  mb-2 capitalize'/>
    </>
  )
}

export default Input