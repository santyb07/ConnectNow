import { Box } from '@mui/material'
import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetConversationMutation } from '../../../../services/conversationApi'
import ChatHeader from './ChatHeader'
import Messages from './Messages'

const container ={
  height:'100%',
  width:'100%',
}
const ChatBox = () => {
  const [getConversation,{isLoading}] = useGetConversationMutation()
  const person = useSelector(state=>state.person)
  const user = useSelector(state=>state.user)
  const [conversation,setConversation]=useState({})

  useEffect(()=>{
    const getConversationDetails = async()=>{
      let response = await getConversation({senderId:user.id,receiverId:person.id})
      if(response?.data?.status==='success'){
        // console.log(response.data.msg)
        setConversation(response.data.msg)
      }else{
        console.log(response)
      }
    }
    getConversationDetails();
  },[person.id])
  return (
    <Box style={container} bgcolor={'background.default'}>
      <ChatHeader person={person}/>
      <Messages person={person} conversation={conversation}/>
    </Box>
  )
}

export default ChatBox