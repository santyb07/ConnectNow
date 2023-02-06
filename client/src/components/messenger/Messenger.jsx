import React from 'react'
import { Box, Typography } from '@mui/material'

import ChatDialog from './chat/ChatDialog'

const Container={
  // display:'flex',
  width:'100vw',
  height:'92vh',
  // margin:'0 0'
}

function Messenger(){

  return (
    <Box sx={Container} bgcolor={'background.default'}>
      <ChatDialog/>
    </Box>
  )
}

export default Messenger