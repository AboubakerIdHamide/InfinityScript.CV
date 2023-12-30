// import React from 'react'
'use client';

import { Button, Navbar, Footer  } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Body, Templates, Contact, About} from "../../components/home";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { languages } from '../../utils/constants';

const Home = () => {
  const { i18n,t } = useTranslation();
  const { auth } = useSelector(state => state);
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    dispatch(setLanguage(e.target.value));
  };
  return (
    <div className="flex flex-col gap-10 bg-[url('colored-bg.jpg')] bg-no-repeat bg-cover">
    <div className="fixed w-screen h-auto ">
      <Navbar fluid rounded className=' bg-gradient-to-b from-white to-purple-100'>
        <Navbar.Brand as={Link} to="">
          <img src="/logo-no-background.png" className="mr-3 h-6 sm:h-9 scale-125" alt="InfinityScript.CV" />
          <span className="self-center whitespace-nowrap text-xl font-semibold ">Infinity<span className='text-purple-500'>Script</span>CV</span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-3 ">
          {!auth.token ? (
            <Button as={Link} to={"auth/login"} color='light' className='hidden sm:flex'>{t("home.login")}</Button>
          ) : (
            <Button as={Link} to={"dashboard/profile"} color='light' className='hidden sm:flex'>{t("home.profile")}</Button>
          )}
          <Button gradientMonochrome="purple">{t("home.get_started")}</Button>
          <Navbar.Toggle />
        </div>
          <Navbar.Collapse>
            <Navbar.Link as={Link} to="dashboard">{t("home.dashboard")}</Navbar.Link>
            <Navbar.Link href='#templates'>{t("home.templates")}</Navbar.Link>
            <Navbar.Link href="#contact">{t("home.contact")}</Navbar.Link>
            <Navbar.Link href='#about'>{t("home.about")}</Navbar.Link>
          </Navbar.Collapse>
      </Navbar>
      </div>

      <Body/>

      <Templates />

      <Contact/>

      <About />

      <Footer container className='bg-gradient-to-b from-purple-100 to-white flex justify-between items-center'>
        <Footer.Copyright href="#" by="InfinityScript™" year={2023} className='inline' />
        <select value={i18n.language} onChange={changeLanguage} className="font-mono text-royal-purple font-bold sm:w-[106px] text-sm border-0 focus:ring-0">
          {languages.map((language, index) =>  (
                <option className='p-[10px]' key={index} value={language.code}>{language.name}</option>
            )
          )}
        </select>
      </Footer>
    </div>
  )
}

export default Home