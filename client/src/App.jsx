// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './views/HomePage';
import { Dashboard } from './views/Dashboard';
import {
  ForgotPassword,
  Login,
  Register,
  VerifyEmail,
  ResetPassword
} from './views/AuthPages';

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
