// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './views/HomePage';
import {
  DashboardLayout,
  Templates,
  MyResumes,
  CreateResume,
  Profile
} from './views/Dashboard';
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
        <Route path='/auth'>
          <Route path='*' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='verify-email' element={<VerifyEmail/>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='reset-password' element={<ResetPassword/>}/>
        </Route>
        <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route path='' element={<Templates/>}/>
            <Route path='my-resumes' element={<MyResumes/>}/>
            <Route path='create-resume' element={<CreateResume/>}/>
            <Route path='profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
