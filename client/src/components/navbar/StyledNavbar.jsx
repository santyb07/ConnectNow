import {Toolbar,styled} from "@mui/material"
import { NavLink } from 'react-router-dom'


 const StyledNavbar={
 NavBar:styled(Toolbar)({
    display:'flex',
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center'
 }),
 navigationMenu:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
Login:{
fontWeight:'600',
textTransform:'none',
},
 Navlinks:styled(NavLink)({
  textDecoration:'none',
  color:'inherit',
  fontWeight:500,
  letterSpacing:'2px',
  margin:'0 20px 0 0'
}),
styledLogo:{paddingLeft:{
      xl:'15%',
      lg:'15%',
      md:'10%',
      sm:'0%',
      xs:'0%'
    }
  }
}
export default StyledNavbar;