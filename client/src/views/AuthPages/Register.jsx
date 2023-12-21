//import React from 'react';
'use client';
import { EmailInput,PasswordInput,PasswordConfirmationInput,CheckboxInput } from '../../components/authPages';
import { Button } from 'flowbite-react';
const Register = () => {
  return (
    <>
    <div className="bg-[#7752FE] h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <h1 className='text-white text-2xl font-bold'>LOGO</h1>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">

        <EmailInput/>
        <PasswordInput/>
        <PasswordConfirmationInput/>

        <CheckboxInput/>
        <Button type="submit" color='light' className='text-[#190482]'>SIGN UP</Button>
        <span className='text-white text-center '>Already have an account ? <br/>Login from <a href="./login" className='underline font-bold'>here</a>.</span>
      </form>
    </div>
    </>
  )
}
export default Register