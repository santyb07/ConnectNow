import { Form } from "formik";
import {styled} from "@mui/material"

const StyledUserRegister={
    Container:{
        padding:'10% 0',
        width:'100%',
        height:'92vh',
        // height:'100%'
        // overflow:'hidden',
      },
       StyledPaper:{
        padding:'3%',
        width:{
          xl:"30%",
          lg:"40%",
          md:"50%",
          sm:"90%",
          xs:'90%'
        },
        margin:'auto auto',
        borderRadius:'30px'
      },
       StyledForm:styled(Form)({
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
      }),
       Spacing:{
        textTransform:"capitalize",
        marginBottom:'1.5rem',
      },
      StyledTextField:{
        textTransform:"capitalize",
        marginBottom:'1.5rem',
        width:'70%'
      },
       StyledButton:{
        width:'70%',
        textTransform:'none',
        fontWeight:600,
        fontSize:'1rem',
        padding:"0.5rem 2rem",
      },
       Icons:{
        fontSize:'4rem',
        textTransform:"capitalize",
        marginBottom:'1.5rem',
      },
       StyledCheckbox:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
      },
      alertMessage:{
        marginTop:'1rem',
        marginBottom:'1rem',
      },
      styledTextarea:{
        width:'100%',
        marginBottom:"20px",
        fontSize:'1rem',
        outline:'none',
        padding:'5px 10px',
        borderRadius:'10px'
      },
      updateAccountPaper:{
        padding:'5%',
        width:{
          xl:"60%",
          lg:"60%",
          md:"70%",
          sm:"95%",
          xs:'100%'
        },
        margin:'auto',
        borderRadius:'30px'
      }, 
      styledUserImage:{
        width:'90%',
        height:'50%',
        padding:"5% 10%",
        borderRadius:'50%'
      },
      profileUpload:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }
      
}

export default StyledUserRegister