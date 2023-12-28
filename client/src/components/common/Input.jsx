import React from 'react'

const Input = ({ placeholder, value, setValue, type }) => {
  
  return (
    <>
        <input type={type ? type :"text"} value={value} onChange={e=>setValue(e.target.value)} placeholder={placeholder} className='rounded-lg text-royal-purple bg-[#EFF1F9] border-0 p-[10px] focus:ring-0 placeholder-[#ABAFB1]  mb-2 capitalize'/>
    </>
  )
}

export default Input