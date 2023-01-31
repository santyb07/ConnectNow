import { createSlice } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"

const initialState={
    username:"",
    email:"",
    usertype:"",
    profile:"",
    firstname:"",
    lastname:"",
    mobile:"",
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.username=action.payload.username;
            state.email= action.payload.email;
            state.usertype = action.payload.usertype;
            state.profile = action.payload.profile;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.mobile = action.payload.mobile;
        },
        unsetUserInfo:(state,action)=>{
            state.username="";
            state.email= "";
            state.usertype = "";
            state.profile = "";
            state.firstname = "";
            state.lastname = "";
            state.mobile = "";
            storage.removeItem("persist:userPersist")
        }
    }
})

export const {setUserInfo, unsetUserInfo} = userSlice.actions;
export default userSlice.reducer;