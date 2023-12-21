// import React from 'react'

'use client';
import { EmailInput } from "../../components/authPages";
import { Button } from 'flowbite-react';

const VerifyEmail = () => {
  return (
    <>
    <div className="bg-royal-purple h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <h1 className='text-white text-2xl font-bold'>LOGO</h1>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">
        
        <EmailInput/>

        <Button type="submit" color='light' className='text-[#190482] '>VERIFY</Button>
      </form>
    </div>
    </>
  )
}

export default VerifyEmail