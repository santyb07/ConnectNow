import React,{ useState, useRef } from 'react'

import {Formik, Form} from "formik"
import * as Yup from "yup"

import StyledUserRegister from '../formui/StyledUserRegister'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import TextFieldWrapper from '../formui/TextFirldWrapper'
import ButtonWrapper from '../formui/ButtonWrapper'
import { useGenerateOTPMutation, useVerifyOTPMutation } from '../../../services/userApi'
import CreateNotification from '../../CreateNotification'
import {useNavigate} from "react-router-dom"

const emailState={
  email:""
}
const OTPState={
  OTP:''
}

const EMAIL_VALIDATION= Yup.object().shape({
  email:Yup.string()
  .email('Invalid email.')
  .required('Required!'),
})
const OTP_VALIDATION = Yup.object().shape({
  OTP:Yup.string()
  .required('An OTP is required to reset the password')
  // .positive("An OTP can't start with minus")
  // .integer("An OTP can't include decimals")
  .min(5,'OTP should be 5 digits')
  .max(10,'OTP should be less than 10 digits')
})


const ForgotPasswordMail = () => {
  const {Container, StyledPaper,StyledForm,Spacing,StyledButton,Icons,StyledTextField} = StyledUserRegister;
  const [sentOTP,setSentOTP] = useState(false);
  const [generateOTP,{isLoading,isSuccess}] = useGenerateOTPMutation()
  const [verifyOTP,{isLoading:verifyingOTP}] = useVerifyOTPMutation()
  const navigate = useNavigate();
  // const disableRef = useRef();

  const handlePasswordResetEmail=async(email)=>{
    const response = await generateOTP(JSON.stringify(email).toLocaleLowerCase());
    if(response?.data?.status==='success'){
      CreateNotification(response.data.msg,'success')
      setSentOTP(true)
    }
    else{
      CreateNotification(response.error.data.msg,'error')
      console.log(response);
      setSentOTP(false)
    }
  }
  const handleVerifyOTP = async(OTP)=>{
    const response = await verifyOTP(JSON.stringify(OTP));
    if(response?.data?.status==='success'){
      CreateNotification(response.data.msg,'success')
      // disableRef.current.disabled=true;
      setTimeout(()=>{
        navigate("/forgot-password")
      },3000)
    }else{
      CreateNotification(response.error.data.msg,'error')
      console.log(response);
    }
  }
  return (
    <Box sx={Container} bgcolor={'background.default'}>
      <Paper sx={StyledPaper} elevation={2}>
        <Formik 
        initialValues={{...emailState}}
        validationSchema={EMAIL_VALIDATION}
        onSubmit={(values)=>handlePasswordResetEmail(values)}
        >
          <StyledForm>
            <Typography sx={Spacing} variant='h4'>Forgot Password</Typography>
            <TextFieldWrapper sx={StyledTextField} label='Email' name="email"/>
            {isLoading?
              <ButtonWrapper variant='contained' sx={StyledButton} disabled>
                <CircularProgress color='secondary' size="1.5rem"/>
                Sendign Mail...
              </ButtonWrapper>:
                <ButtonWrapper sx={StyledButton} type="submit" variant="contained">Send Mail</ButtonWrapper>            
              }
          </StyledForm>
        </Formik>
        {
          sentOTP && <Formik 
          initialValues={OTPState}
          validationSchema={OTP_VALIDATION}
          onSubmit={(values)=>handleVerifyOTP(values)}
          >
            <StyledForm sx={{marginTop:'30px'}}>
              <TextFieldWrapper sx={StyledTextField} label='Enter OTP' name="OTP" type='number'/>
              {verifyingOTP?
                <Button variant='contained' sx={StyledButton} disabled>
                  <CircularProgress color='secondary' size="1.5rem"/>
                  Logging in...
                </Button>:
                  <ButtonWrapper sx={StyledButton} type="submit" variant="contained">verify OTP</ButtonWrapper>            
                }
            </StyledForm>
          </Formik>
        }
        
      </Paper>
    </Box>
  )
}

export default ForgotPasswordMail