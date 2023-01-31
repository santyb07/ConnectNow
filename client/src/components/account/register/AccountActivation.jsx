import React from 'react'
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material"

import { useActivateAccountMutation } from '../../../services/userApi'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const styledPaper={
  height:'30vh',
  width:'80vw',
  margin:'auto',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:"center",
}
const Heading={
  fontSize:{
    xl:'3rem',
    lg:'3rem',
    md:'2.5rem',
    sm:'2rem',
    xs:'1.3rem',
  },
  textAlign:'center'
}

const AccountActivation = () => {
  const {activation_token} = useParams()
  const [activateAccount,{isLoading}] = useActivateAccountMutation();
  const [notification,setNotification]= useState('')

  useEffect(()=>{
    const handleActivation= async()=>{
      const response = await activateAccount(JSON.stringify({activation_token}));
      if(response?.data?.status==='success'){
        setNotification('Account Activated Successfully');
      }else{
        setNotification("Oops ! Something went wrong.")
      }
      console.log(response)
    }
    handleActivation();
  },[])
  return (
    <Box bgcolor={'background.default'} height='100vh'>
      <Paper elevation={5} sx={styledPaper}>
        {
          isLoading?
          <Typography variant='h3' color='white'><CircularProgress/>Please Wait...</Typography>:
          <>
          <Typography variant='p' sx={Heading} color='white'>{notification}</Typography>
          <NavLink to="/login" style={{textDecoration:'none'}}>
          <Button variant="contained">Click here to login</Button>
          </NavLink>
          </>
        }
      </Paper>
    </Box>
  )
}

export default AccountActivation