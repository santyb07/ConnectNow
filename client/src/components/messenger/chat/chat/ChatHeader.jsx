import React,{useEffect, useState} from 'react'
import {useSelector} from "react-redux"

import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';

const Header = styled(Box)`
    height: 60px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 16px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 2.5rem;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 16px !important;
`;


const ChatHeader = ({person}) => {
    const url = person.profile || 'https://res.cloudinary.com/dlxx86yjz/image/upload/v1675244631/1672911887920-blog-user_xmq1nj.png'
      const activeUsers = useSelector((state)=>state.conversation.activeUsers)
      const [onlineUsers,setOnlineUsers] =useState([])
  
    useEffect(()=>{
        setOnlineUsers(activeUsers)
        // console.log(activeUsers)
    },[activeUsers])
  
  return (
    <Header>
    <Image src={url} alt="display picture" />     
    <Box>
        <Name>{person.username}</Name>
        <Status>{onlineUsers?.find(user => user.id === person.id) ? 'Online' : 'Offline'}</Status>
        {/* <Status>Offline</Status>     */}
    </Box>   
    <RightContainer>
        <Search />
        <MoreVert />    
    </RightContainer> 
</Header>
  )
}

export default ChatHeader