import React, { useRef } from 'react'
import { Box, styled } from '@mui/material'
import Menu from "./menu/Menu"
import ChatBox from './chat/ChatBox'
import { useSelector } from 'react-redux'
import EmptyChat from './chat/EmptyChat'


const Component ={
  display:'flex',
  height:'100%',
  width:'100%'
}
const LeftComponent=styled(Box)`
width:27%;
`
// min-width:450px;
const RightComponent= styled(Box)`
width:73%;
height:100%;
border-left:1px solid rgba(0,0,0,0.14)
`
// min-width:300px;


const ChatDialog = () => {
  const person = useSelector(state=>state.person)
  

  return (
    <Box sx={Component} bgcolor={'background.light'}>
      <LeftComponent>
        <Menu/>
      </LeftComponent>
      <RightComponent>
        {
        person.id!==""  ? <ChatBox/> : <EmptyChat />
        }
      </RightComponent>
    </Box>
  )
}

export default ChatDialog