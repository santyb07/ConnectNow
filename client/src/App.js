import React, { useEffect,useRef } from 'react'
import { io } from 'socket.io-client';

import { BrowserRouter ,Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import { getToken } from './services/SessionStorageService'
//components
import Home from './components/home/Home'
import Login from './components/account/login/Login'
import Register from './components/account/register/Register'
import AccountActivation from "./components/account/register/AccountActivation"
import Navbar from './components/navbar/Navbar'
import ForgotPasswordMail from './components/account/updation/ForgotPasswordMail'
import ForgotPassword from './components/account/updation/ForgotPassword'
import Dashboard from './components/account/dashboard/Dashboard'
import Profile from './components/account/profile/Profile'
import Messenger from './components/messenger/Messenger'
import { useDispatch } from 'react-redux'
import { setActiveUsers, setSocket } from './redux/features/conversationSlice'

const PrivateRoutes = ()=>{
  const token = getToken();
  return token? <Outlet/> : <Navigate replace to="/login"/>
}


const App = () => {
  const dispatch = useDispatch()
  const socket = useRef();
  
  useEffect(()=>{
    socket.current = io('ws://localhost:9000')
    dispatch(setSocket(socket))
    socket.current.on('loggedOut',users=>{
      dispatch(setActiveUsers(users))
      // console.log(users)
    })
    
  },[])

  
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/user/activate/:activation_token" element={<AccountActivation/>}/>
      <Route path="/*" element={<Navigate replace to='/login'/>}/>
      <Route path="/forgot-password-mail" element={<ForgotPasswordMail/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>

      {/* Private routes */}
      <Route element={<PrivateRoutes/>}>
      <Route path='/' element={<Messenger/>}/>
      <Route path="/profile"  element={<Profile/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>

    </Routes>
    <ToastContainer/>               
    </BrowserRouter>
  )
}

export default App