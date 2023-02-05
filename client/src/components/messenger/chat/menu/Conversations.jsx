import { Box,styled,Divider } from '@mui/material';
import React,{useState, useEffect, useContext} from 'react'
import { getToken } from '../../../../services/SessionStorageService'

import { useGetAllUsersQuery } from '../../../../services/userApi'
import Conversation from './Conversation';
import SocketProvider from '../../../../context/SocketProvider';
import { useSelector } from 'react-redux';

const Container = styled(Box)`
    overflow: overlay;
    `;
    // height: 100%;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: 0.6;
`;

const Conversations = ({text}) => {
    const token = getToken()
    const {data,isLoading,isSuccess} =useGetAllUsersQuery(token);
    const [users,setUsers]=useState([]);
    const {socket, setActiveUsers} = useContext(SocketProvider)
    const user = useSelector(state=>state.user)

    useEffect(()=>{
        if(data && isSuccess){
            let filteredData = data.users.filter(user=> user.username.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData)
            // console.log(filteredData)
        }
    },[text,data])
    
    useEffect(()=>{
        socket.current.emit('addUser',user);
        socket.current.on('getUsers',users=>{
            setActiveUsers(users)
        })
    },[user.id])
  return (
    <Container>
        {
            users && users.map((user,index)=>(
                <>
                <Conversation user={user}/>
                {
                    users.length !== (index +1) && <StyledDivider/>
                }
                </>
            ))
       }
    </Container>
  )
}

export default Conversations