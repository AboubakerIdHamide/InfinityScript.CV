//import React from 'react';
'use client';
import { EmailInput } from '../../components/authPages/EmailInput';
import { Button, Checkbox, Label } from 'flowbite-react';
const Register = () => {
  return (
    <>

    <link rel="stylesheet" data-purpose="Layout StyleSheet" title="Default" href="/css/app-af6a05f42b013986b481566363f0186f.css?vsn=d"/>
    <link rel="stylesheet" data-purpose="Layout StyleSheet" title="Web Awesome" href="/css/app-wa-cc491567b46eab1188c6538ebc462e7d.css?vsn=d"/>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css"/>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-solid.css"/>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-regular.css"/>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css"/>

    <div className="bg-[#7752FE] h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <h1 className='text-white text-2xl font-bold'>LOGO</h1>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">
        
        <EmailInput/>

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <i className="fa-light fa-lock text-white"></i>
          </div>
          <input type="password" id="password" className="bg-transparent border border-white text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PASSWORD"/>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <i className="fa-light fa-lock text-white"></i>
          </div>
          <input type="password" id="passwordC" className="bg-transparent border border-white text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PASSWORD CONFIRMATION"/>
        </div>
        
        <div className="flex items-center gap-2">
          <Checkbox id="remember" color="purple" />
          <Label htmlFor="remember" className='text-white'>Remember me</Label>
        </div>
        <Button type="submit" color='light' className='text-[#190482]'>SIGN UP</Button>
        <span className='text-white text-center '>Already have an account ? <br/>Login from <a href="./login" className='underline font-bold'>here</a>.</span>
      </form>
    </div>
    </>
  )
}

export default Register