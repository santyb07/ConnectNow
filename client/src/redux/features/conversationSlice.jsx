import { createSlice } from "@reduxjs/toolkit";


const initialState={
    newMessageFlag:false,
    activeUsers:[],
    socket:{}
}

const conversationSlice = createSlice({
    name:'conversation',
    initialState,
    reducers:{
        setNewMessageFlag:(state,action)=>{
            state.newMessageFlag=!state.newMessageFlag
            // console.log(!state.newMessageFlag)
        },
        setSocket:(state,action)=>{
            state.socket = action.payload
        },
        setActiveUsers:(state,action)=>{
            state.activeUsers=action.payload
        }
           
    }
})

export const {setNewMessageFlag,setSocket,setActiveUsers} = conversationSlice.actions;
export default conversationSlice.reducer;