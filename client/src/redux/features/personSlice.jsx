import { createSlice } from "@reduxjs/toolkit"

const initialState={
    id:"",
    username:"",
    email:"",
    profile:"",
    usertype:"",
    firstname:"",
    lastname:"",
    mobile:"",
}

const personSlice = createSlice({
    name:'person',
    initialState,
    reducers:{
        setPersonInfo:(state,action)=>{
            state.id=action.payload._id;
            state.username=action.payload.username;
            state.email= action.payload.email;
            state.profile= action.payload.profile;
            state.usertype = action.payload.usertype;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.mobile = action.payload.mobile;
        },
        unsetPersonInfo:(state,action)=>{
            state.id="";
            state.username="";
            state.email= "";
            state.profile= "";
            state.usertype = "";
            state.firstname = "";
            state.lastname = "";
            state.mobile = "";
        }
    }
})

export const {setPersonInfo, unsetPersonInfo} = personSlice.actions;
export default personSlice.reducer;