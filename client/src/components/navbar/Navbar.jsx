import React,{useState} from 'react'

import {useDispatch} from "react-redux"
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../services/SessionStorageService';
import { unsetUserInfo } from '../../redux/features/userSlice';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode"
import { AppBar, Box, Button, Typography } from '@mui/material';
import StyledNavbar from './StyledNavbar';
import { AccountCircle, Logout } from '@mui/icons-material';


const Navbar = () => {
  const dispatch = useDispatch();
  const [user,setUser] = useState(getToken());
  const location = useLocation();
  const {NavBar, Navlinks,styledLogo,navigationMenu,Login} = StyledNavbar;
  const navigate = useNavigate()

  const handleLogout=()=>{
    dispatch(unsetUserInfo())
    removeToken();
    setUser(null);
    navigate("/login")
  }
  
  useEffect(()=>{
    const verifyToken = user?.split(" ")[1];
    if(verifyToken){
      const decodedToken = jwt_decode(verifyToken)
      if(decodedToken.exp *1000 < new Date().getTime()) handleLogout();
    }
    setUser(getToken())
    // console.log("useEffect")
  },[location])

  // useEffect(()=>{
  //   if(user===null){
  //     navigate("/register") || navigate("/login") 
  //   }
  //   console.log('navigation')
  // },[])

  return (
    <AppBar position='sticky' sx={{height:'8vh'}}>
      <NavBar>
        <Box sx={styledLogo}>
          <Navlinks to={"/"}>
            <Typography variant='h4'>Logo</Typography>
          </Navlinks>
        </Box>
        <Box sx={navigationMenu}>
        {user ?
              <>
                <StyledNavbar.Navlinks to={'/profile'}>
                  Profile</StyledNavbar.Navlinks>
                  <StyledNavbar.Navlinks to={'/dashboard'}>
                  Dashboard</StyledNavbar.Navlinks></>
                  : ""
              }
              {
                user ?
                // <NavLink to={'/'} style={{textDecoration:"none"}}>
                  <Button sx={Login} variant='contained'
                  onClick={()=>handleLogout()}> 
                  <Logout style={{marginRight:'7px'}}/>
                  Log Out</Button>
                  // </NavLink>
                  :<NavLink to={'/login'} style={{textDecoration:"none"}}>
                  <Button sx={StyledNavbar.Login} variant='contained'>
                    <AccountCircle style={{marginRight:'7px'}}/>
                    login</Button>
                  </NavLink>
              }
        </Box>
      </NavBar>
    </AppBar>
  )
}

export default Navbar