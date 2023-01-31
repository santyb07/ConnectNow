import {createTheme} from "@mui/material"


const theme= createTheme({
    palette:{
        mode:"dark",
        background:{
          default:"#333333",
          light:"#2C394B",
          paper:"#000",
        },
        primary:{
          main:"#FF4C29",
          contrastText:"#fff"
        },
        secondary:{
          main:"#082032",
          contrastText:"#fff",
        },
        paper:{
            marginTop: '10px',
            display:'flex',
            flexDirection:'column',
            alignItem:'center',
            textAlign:"center",
            padding:"20px",
        }
      }
})

export default theme;