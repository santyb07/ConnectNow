import React from 'react'
import * as Yup from "yup"
import {Box, Button, IconButton, InputAdornment, Paper, Typography, CircularProgress} from "@mui/material"

import {Formik}  from "formik"
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material"
import StyledUserRegister from '../formui/StyledUserRegister'
import { useState } from 'react'
import CheckboxWrapper from '../formui/Checkbox'
import ButtonWrapper from '../formui/ButtonWrapper'
import TextFieldWrapper from '../formui/TextFirldWrapper'
import CreateNotification from '../../CreateNotification'

import { useRegisterUserMutation } from '../../../services/userApi'
import { NavLink } from 'react-router-dom'

const initialState={
    username:"",
    email:"",
    password:"",
    termsofservice:false
  }

const FORM_VALIDATION = Yup.object().shape({
    username:Yup.string().required('Required'),
    email:Yup.string().email('Invalid Email.').required('Required'),
    password:Yup.string().required("Required!"),
    termsandconditions:Yup.boolean().oneOf([true],'The terms and conditions must be accepted.')
    .required('The terms and conditions must be accepted.'),

})

const Register = () => {
    const {Container, StyledPaper,StyledForm,Spacing,StyledButton,Icons,StyledCheckbox,StyledTextField} = StyledUserRegister;
    const [showPassword, setShowPassword]= useState(false);
    const [registerUser,{isLoading}] = useRegisterUserMutation();


    const handleRegister=async(registerData,resetForm)=>{
      const response = await registerUser(JSON.stringify(registerData))
      if(response?.data?.status === 'success'){
        console.log(response)
        resetForm();
        CreateNotification(response.data.msg,'success')
      }else{
        CreateNotification(response.error.data.msg,'error')
        console.log(response);
      }
    }
  return (
    <Formik
    initialValues={initialState}
    validationSchema={FORM_VALIDATION}
    // validateOnChange={false}
    // validateOnBlur={false}
    onSubmit={(values,{resetForm})=>handleRegister(values,resetForm)}
    >
    <Box bgcolor={'background.default'} sx={Container}>
        <Paper sx={StyledPaper} elevation={7}>
            <StyledForm>
                <AccountCircle fontSize="large" color="primary" sx={Icons}/>
                <Typography sx={Spacing} variant='h4'>Signup</Typography>
                <TextFieldWrapper sx={StyledTextField}  label='Username' name="username" />
                <TextFieldWrapper sx={StyledTextField}  label='Email' name="email" />
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
                <CheckboxWrapper
                name="termsandconditions"
                legend="Terms and Conditions"
                label="I agree"
                sx={StyledCheckbox}
                />
                {
              isLoading?
              <Button variant='contained' sx={StyledButton} disabled fullWidth>
                <CircularProgress color='secondary' size="1.5rem"/>
                Register
              </Button>:
                <ButtonWrapper sx={StyledButton} type="submit" variant="contained" fullWidth>Register</ButtonWrapper>            
              }
               <NavLink to='/login' style={{textDecoration:'none'}}>
                <Typography
                color='primary' 
              sx={{margin:'30px auto'}}>
                already have an account? Login here
                </Typography>
                </NavLink>
                </StyledForm>
        </Paper>
    </Box>
    </Formik>
  )
}

export default Register