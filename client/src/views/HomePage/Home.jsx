// import React from 'react'
'use client';

import { Button, Navbar, Footer  } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Body, Templates, Contact, About} from "../../components/home";
import { useSelector } from "react-redux";

const Home = () => {
  const { auth } = useSelector(state => state);
  return (
    <div className="flex flex-col gap-10 bg-[url('colored-bg.jpg')] bg-no-repeat bg-cover">
    <div className="fixed w-screen h-auto ">
      <Navbar fluid rounded className=' bg-gradient-to-b from-white to-purple-100'>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src="/logo-no-background.png" className="mr-3 h-6 sm:h-9 scale-125" alt="InfinityScript.CV" />
          <span className="self-center whitespace-nowrap text-xl font-semibold ">Infinity<span className='text-purple-500'>Script</span>CV</span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-3 ">
          {!auth.token ? (
            <Button as={Link} to={"auth/login"} color='light' className='hidden sm:flex'>Log In</Button>
          ) : (
            <Button as={Link} to={"dashboard/profile"} color='light' className='hidden sm:flex'>Profile</Button>
          )}
          <Button gradientMonochrome="purple">Get started</Button>
          <Navbar.Toggle />
        </div>
          <Navbar.Collapse>
            <Navbar.Link as={Link} to="dashboard">Dashboard</Navbar.Link>
            <Navbar.Link href='#templates'>Templates</Navbar.Link>
            <Navbar.Link href="#contact">Contact</Navbar.Link>
            <Navbar.Link href='#about'>About</Navbar.Link>
          </Navbar.Collapse>
      </Navbar>
      </div>

      <Body/>

      <Templates />

      <Contact/>

      <About />

      <Footer container className='bg-gradient-to-b from-purple-100 to-white'>
        <Footer.Copyright href="#" by="InfinityScript™" year={2023} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  )
}

export default Home