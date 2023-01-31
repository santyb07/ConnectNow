import React,{useEffect, useState} from 'react'

import {useNavigate, useParams} from "react-router-dom"

import {Alert, Box,Button,CircularProgress,IconButton,InputAdornment,Paper, Snackbar, Typography} from "@mui/material"
import StyledUserRegister from '../formui/StyledUserRegister'

import TextFieldWrapper from '../formui/TextFirldWrapper'
import ButtonWrapper from '../formui/ButtonWrapper'

import { Formik, Form } from 'formik';
import * as Yup from "yup"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForgotPasswordMutation } from '../../../services/userApi'
import CreateNotification from '../../CreateNotification'

const initialState={
  password:'',
  confirmpassword:''
}

const FORM_VALIDATION=Yup.object().shape({
    password:Yup.string()
    .min(6,'password must be atleast 6 characters')
    .max(20,'password must not be greater than 20 characters')
    .required('Required'),
    confirmpassword:Yup.string()
    .oneOf([Yup.ref('password')],'Password must be the same!')
    .required('Required'),
  })

const ForgotPassword = () => {
    const {Container, StyledPaper,StyledForm,Spacing,StyledButton,Icons,StyledTextField} = StyledUserRegister;
    const [forgotPassword,{isLoading,isSuccess}]= useForgotPasswordMutation();
    const navigate= useNavigate();

  const [showPassword,setShowPassword]=useState(false);
  const [showPassword2,setShowPassword2]=useState(false);
  const handleShowPassword=()=>setShowPassword((prevShowPassword)=> !prevShowPassword)
  const handleShowPassword2=()=>setShowPassword2((prevShowPassword)=> !prevShowPassword)
  

  const onSubmitPassword=async(changePasswordData,resetForm)=>{
    const response = await forgotPassword(JSON.stringify(changePasswordData));
    if(response?.data?.status==='success'){
        CreateNotification(response.data.msg,'success')
        setTimeout(()=>{
            navigate('/login')
        },3000)
    }else{
        CreateNotification(response.error.data.msg,'error')
        console.log(response)
    }
  }

  

  return (

    <Box bgcolor={'background.default'} sx={Container}>
        <Paper elevation={5} sx={StyledPaper}>
      <Formik
        initialValues={{...initialState}}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values,{resetForm})=>onSubmitPassword(values,resetForm)}
        >
      <StyledForm>
        <Typography variant='h4' sx={Spacing}>Reset Password</Typography>
        <TextFieldWrapper label='Password' name='password'  sx={Spacing}
        type={showPassword? 'text':'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleShowPassword}
              >
                {showPassword ? <Visibility color='white'/> : <VisibilityOff color='white'/>}
              </IconButton>
            </InputAdornment>
          )
        }}
        />
        <TextFieldWrapper label='Confirm Password' name="confirmpassword" sx={Spacing}
        type={showPassword2? 'text':'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword2}
                onMouseDown={handleShowPassword2}
              >
                {showPassword2 ? <Visibility color='white'/> : <VisibilityOff color='white'/>}
              </IconButton>
            </InputAdornment>
          )
        }}
        />
        {isLoading || isSuccess? 
        <ButtonWrapper sx={StyledButton} disabled>
        <CircularProgress color="secondary" style={{marginRight:'10px'}}/>
        Reset Password</ButtonWrapper>:
        <ButtonWrapper variant='contained' type='submit' sx={StyledButton}>Reset Password</ButtonWrapper>
        }
      </StyledForm>
      </Formik>
      </Paper>
    </Box>
  )
}

export default ForgotPassword;