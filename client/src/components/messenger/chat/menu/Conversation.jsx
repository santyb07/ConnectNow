import React, { useState,useEffect } from 'react'
import { Box, Typography,styled } from "@mui/material"
import { formatDate } from '../../../../utils/common-utils';
import { useDispatch,useSelector } from 'react-redux';
import { setPersonInfo } from '../../../../redux/features/personSlice';
import { useSetConversationMutation } from '../../../../services/conversationApi';
import { useGetConversationMutation } from '../../../../services/conversationApi';

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 13px;
    margin:10px 0px 20px 0px;
    cursor: pointer;
`;
    
const Image = styled('img') ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    // padding: '0 14px';
});
const styledTypo = {
    margin:'0 auto auto 20px',
}

const Container = styled(Box)`
    display: flex;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #fff;
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    font-size: 14px;
    color:white;
    margin:0 auto auto 20px;
    `;
    // color: rgba(0, 0, 0, 0.6);

const Conversation = ({user}) => {
  const [message, setMessage] = useState({});
  const dispatch= useDispatch()
  const [setConversation,{isLoading}] =useSetConversationMutation()
  const [getConversation,{isLoading:conversationLoading}] = useGetConversationMutation();
  const loggedUser = useSelector(state=>state.user)
  const conversation = useSelector(state=>state.conversation)



  useEffect(()=>{
    const getConversationMessage = async()=>{
        const response = await getConversation({senderId:loggedUser.id,receiverId:user._id});
        setMessage({text:response?.data?.msg?.message,timestamp:response?.data?.msg?.updatedAt})
        // console.log(message)
    }
    getConversationMessage()
},[conversation.newMessageFlag])

const getUser=async()=>{
  dispatch(setPersonInfo(user))
  const response = await setConversation({senderId:loggedUser.id,receiverId:user._id});
  if(response?.data?.status==='success'){
    // console.log(response)
  }else{
    console.log(response)
  }

}
  return (
    <Component onClick={() => getUser()}>
            <Box>
                <Image src='https://res.cloudinary.com/dlxx86yjz/image/upload/v1675244631/1672911887920-blog-user_xmq1nj.png' alt="display picture" />
            </Box>
            <Box style={{width: '100%'}}>
                <Container>
                    <Typography color='white' sx={styledTypo}>{user.username}</Typography>
                    { 
                        message?.timestamp && 
                        <Timestamp>{formatDate(message.timestamp)}</Timestamp>
                    }
                </Container>
                <Box>
                    <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                </Box>
            </Box>
        </Component>
  )
}

export default Conversation