import React, { useState } from 'react'
import {Formik} from "formik"
import * as Yup from "yup"
import { useLoginUserMutation } from '../../../services/userApi'
import ButtonWrapper from '../formui/ButtonWrapper'
import TextFieldWrapper from '../formui/TextFirldWrapper'
import { storeToken  } from '../../../services/SessionStorageService'
import StyledUserRegister from '../formui/StyledUserRegister'
import { Box, Button, CircularProgress, IconButton, InputAdornment, Paper, Typography } from '@mui/material'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import {NavLink, useNavigate} from "react-router-dom"
import CreateNotification from '../../CreateNotification'
import {useDispatch} from "react-redux"
import { setUserInfo } from '../../../redux/features/userSlice'

const initialState={
  email:"",
  password:"",
}

const FORM_VALIDATION= Yup.object().shape({
  email:Yup.string()
  .email('Invalid email.')
  .required('Required'),
  password:Yup.string()
  .required('Required'),
})

const Login = () => {
  const {Container, StyledPaper,StyledForm,Spacing,StyledButton,Icons,StyledTextField} = StyledUserRegister;
  const [showPassword, setShowPassword]= useState(false);
  const [loginUser,{isLoading}] = useLoginUserMutation()
  const navigate = useNavigate()
  const dispatch= useDispatch()

  const handleLogin = async(loginData)=>{
    const response = await loginUser(JSON.stringify(loginData))
    if(response?.data?.status==='success'){
      storeToken(`Bearer ${response.data.token}`);
      dispatch(setUserInfo(response.data.user))
      // console.log(response)
      navigate("/");
    }else{
      CreateNotification(response.error.data.msg,'error');
      console.log(response);
    }
  }

  return (
    <Box bgcolor={'background.default'} sx={Container}>
      <Paper sx={StyledPaper} elevation={7}>
    <Formik
    initialValues={initialState}
    validationSchema={FORM_VALIDATION}
    // validateOnChange={false}
    // validateOnBlur={false}
    onSubmit={(values)=>handleLogin(values)}
    >
            <StyledForm>
                <AccountCircle fontSize="large" color="primary" sx={Icons}/>
                <Typography sx={Spacing} variant='h4'>Login</Typography>
                <TextFieldWrapper sx={StyledTextField}  label='Email' name="email"/>
                <TextFieldWrapper sx={StyledTextField}  label='Password' name="password" 
                type={showPassword? 'text':'password'}
                InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={()=>setShowPassword(prev=>!prev)}
                onMouseDown={()=>setShowPassword(prev=>!prev)}
                >
                {showPassword ? <Visibility color='white'/> : <VisibilityOff color='white'/>}
                </IconButton>
                </InputAdornment>
                )}}
                />
                {
              isLoading?
              <Button variant='contained' sx={StyledButton} disabled fullWidth>
                <CircularProgress color='secondary' size="1.5rem"/>
                Logging in...
              </Button>:
                <ButtonWrapper sx={StyledButton} type="submit" variant="contained" fullWidth>Login</ButtonWrapper>            
              }
              <NavLink to="/forgot-password-mail" style={{textDecoration:'none'}}>
                <Typography
                color='white' 
              sx={{margin:'30px 15px auto'}}>
                Forget Your Password? click here
                </Typography>
                  </NavLink>
                <NavLink to='/register' style={{textDecoration:'none'}}>
                <Typography
                color='white' 
              sx={{margin:'15px auto'}}>
                Don't have an account? register here
                </Typography>
                </NavLink>
                </StyledForm>
    </Formik>
        </Paper>
    </Box>
  )
}

export default Login