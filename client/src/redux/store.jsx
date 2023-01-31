import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";


import userReducer from "./features/userSlice"
import {userApi} from "../services/userApi"

//redux persist
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig ={
    key:"userPersist",
    storage,
}

const persistedReducer = persistReducer(persistConfig,userReducer);

export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        user:persistedReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false}).concat(userApi.middleware),
    devTools:true
})

setupListeners(store.dispatch);

export const persistUserStore = persistStore(store)