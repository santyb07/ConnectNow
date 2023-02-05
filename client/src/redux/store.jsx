import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";


import userReducer from "./features/userSlice"
import {userApi} from "../services/userApi"
import { conversationApi } from "../services/conversationApi";

//redux persist
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import personReducer from "./features/personSlice";
import conversationReducer from "./features/conversationSlice";

const persistConfig ={
    key:"userPersist",
    storage,
}

const persistedReducer = persistReducer(persistConfig,userReducer);

export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [conversationApi.reducerPath]:conversationApi.reducer,
        user:persistedReducer,
        person:personReducer,
        conversation:conversationReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false}).concat([userApi.middleware,conversationApi.middleware]),
    devTools:true
})

setupListeners(store.dispatch);

export const persistUserStore = persistStore(store)