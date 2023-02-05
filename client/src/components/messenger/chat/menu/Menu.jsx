import React,{useState,useEffect, useContext,useRef} from 'react'
import { Box, Divider, InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { getToken } from '../../../../services/SessionStorageService'

import { useGetAllUsersQuery } from '../../../../services/userApi'
import Conversation from './Conversation';
import { useSelector,useDispatch } from 'react-redux';
import { setActiveUsers } from '../../../../redux/features/conversationSlice';

const Component ={
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #F2F2F2'
}

const Wrapper = styled(Box)`
  position: relative;
  border-radius: 10px;
  background-color: #f0f2f5;
  margin: 0 13px;
  width: 100%;
`;

const Icon = styled(Box)`
  color: #919191;
  padding: 8px;
  height: 100%;
  position: absolute;
`;
    
const InputField = styled(InputBase) `
  width: 100%;
  padding: 16px;
  padding-left: 65px;
  font-size: 14px;
  height: 15px;
  width: 100%;
  color:black;
`;
const Container = styled(Box)`
    overflow: overlay;
    `;
    // height: 100%;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Menu = () => {
  const [text,setText]=useState('');
  const token = getToken()
  const {data,isLoading,isSuccess} =useGetAllUsersQuery(token);
  const [users,setUsers]=useState([]);
  const loggedUser = useSelector(state=>state.user)
  const socket = useSelector(state=>state.conversation.socket)
  const dispatch = useDispatch();


  // useEffect(()=>{
  //   socket.current.on('disconnected',users=>{
  //     dispatch(setActiveUsers(users))
  //     console.log(users)
  //   })
  // },[])
  

      useEffect(()=>{
          if(data && isSuccess){
              let filteredData = data.users.filter(user=> user.username.toLowerCase().includes(text.toLowerCase()));
              setUsers(filteredData)
              // console.log(users)
          }
      },[text,data])
      
      useEffect(()=>{
        // console.log('menu socket',socket.current.connected)
        socket.current.emit('login',loggedUser);
        socket.current.on('getUsers',users=>{
            dispatch(setActiveUsers(users))
        })
      },[loggedUser.id])
      

  return (
    <>
      <Box bgcolor={'background.light'} sx={Component}>
            <Wrapper>
                <Icon>
                    <SearchIcon fontSize="small"/>
                </Icon>
                <InputField
                    placeholder="Search or start new chat"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setText(e.target.value)}
                />
            </Wrapper>
        </Box>
      <Container>
        {
            users && users.map((user,index)=>(
              user._id !== loggedUser.id &&
                <Box key={index}>
                <Conversation user={user} />
                {
                  users.length !== (index +1) && <StyledDivider/>
                }
              </Box>
            ))
       }
    </Container>
    </>
  )
}

export default Menu