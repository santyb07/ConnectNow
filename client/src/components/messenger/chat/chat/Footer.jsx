import React from 'react'

import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
      margin: 5px;
      color: #919191;
    }
    `;
    // width: 100%;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    color:black;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;

const Footer = ({sendText, value, setValue}) => {
  return (
    <Container>
    <EmojiEmotions />
    <label htmlFor="fileInput">
        <ClipIcon />
    </label>
    {/* <input
        type='file'
        id="fileInput"
        style={{ display: 'none' }}
        onChange={(e) => onFileChange(e)}
    /> */}

    <Search>
        <InputField
            placeholder="Type a message"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => sendText(e)}
            value={value}
        />
    </Search>
    <Mic />
</Container>
  )
}

export default Footer