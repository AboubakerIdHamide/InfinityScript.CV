import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './views/HomePage';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
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
  ResetPassword,
  PublicRoutes
} from './views/AuthPages';
import {
  PersonalInfo,
  Biography,
  Skills,
  Educations,
  Experiences,
} from "./components/dashboard/createResume";

function App() {
  const { auth } = useSelector(state => state);

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/auth' element={<PublicRoutes/>}>
          <Route path='*' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='verify-email' element={<VerifyEmail/>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='reset-password' element={<ResetPassword/>}/>
        </Route>
        <Route path='/dashboard' element={auth.token ? <DashboardLayout/> : <Navigate to="/auth/login"/>}>
            <Route path='*' element={<Templates/>}/>
            <Route path='my-resumes' element={<MyResumes/>}/>
            <Route path='create-resume/:template_id?' element={<CreateResume />}>
              <Route path='personal-info' element={<PersonalInfo/>}/>
              <Route path='biography' element={<Biography/>}/>
              <Route path='skills' element={<Skills/>}/>
              <Route path='educations' element={<Educations/>}/>
              <Route path='experiences' element={<Experiences/>}/>
            </Route>
            <Route path='profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
