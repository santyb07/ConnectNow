import React,{useEffect,useState ,useRef} from 'react'

import { useGetMessagesQuery, useNewMessageMutation  } from '../../../../services/conversationApi'
import {useSelector,useDispatch} from "react-redux"
import { setNewMessageFlag } from '../../../../redux/features/conversationSlice'
import {getMessages} from "../../../../services/api"

//components
import Message from './Message'
import Footer from './Footer'
import { Box,styled } from '@mui/material'

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const StyledFooter = styled(Box)`
    height: 55px;
    background: #ededed;
    // position: absolute;
    width: 100%;
    // bottom: 0
`;
    
const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;



const Messages = ({person,conversation}) => {
  const [newMessage,{isLoading}] =useNewMessageMutation();
  const conversationData = useSelector(state=>state.conversation)
  const user = useSelector((state)=>state.user)
  const [messages,setMessages]=useState([])
  const [value,setValue]=useState()
  const dispatch = useDispatch()
  const socket = useSelector(state=>state.conversation.socket)
  const [incomingMessage,setIncomingMessage]=useState(null);

  const scrollRef = useRef();

  useEffect(()=>{
    socket.current.on('getMessage',data=>{
      setIncomingMessage({
        ...data,
        createdAt:Date.now()
      })
    })
    console.log('getmessage called')
  },[])

  useEffect(()=>{
    const getMessageDetails = async()=>{
      let data = await getMessages(conversation?._id);
      setMessages(data)
      // console.log(data)
    }
    getMessageDetails()
  },[conversation?._id,person.id,conversationData.newMessageFlag])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" })
}, [messages]);

useEffect(()=>{
  incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
  setMessages(prev=>[...prev,incomingMessage])
},[incomingMessage,conversation])

  const receiverId = conversation?.members?.find(member => member !== user.id);

  const sendText = async(e)=>{
    let code = e.keyCode || e.which;
    if(!value) return;

    if(code===13){
      let message={
        senderId:user.id,
        receiverId:receiverId,
        conversationId:conversation._id,
        type:'text',
        text:value
      }

      socket.current.emit('sendMessage',message);

      const response = await newMessage(message);
      // console.log(response)
      setValue('');
      dispatch(setNewMessageFlag())
    }
  }
  return (
    <Wrapper>
    <Component>
        {
            messages && messages.map((message,index) => (
                <Container ref={scrollRef} key={index}>
                    <Message message={message} />
                </Container>
            ))
        }
    </Component>
    <Footer 
        sendText={sendText} 
        value={value} 
        setValue={setValue} 
        // setFile={setFile} 
        // file={file} 
        // setImage={setImage}
    />
</Wrapper>
  )
}

export default Messages