import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const conversationApi = createApi({
    reducerPath:"conversationApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080/api/v1/user/"
    }),
    endpoints:(builder)=>({
        setConversation:builder.mutation({
            query:(data)=>{
                return {
                    url:'conversation/add',
                    method:'POST',
                    body:data,
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            }
        }),
        getConversation:builder.mutation({
            query:(data)=>{
                return{
                    url:'conversation/get',
                    method:'POST',
                    body:data,
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            }
        }),
        newMessage:builder.mutation({
            query:(data)=>{
                return{
                    url:'message/add',
                    method:'POST',
                    body:data,
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            }
        }),
        getMessages:builder.query({
            query:(id)=>{
                return{
                    url:`message/get/${id}`,
                    method:'GET',
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            }
        }),
    })
})

export const {
    useSetConversationMutation,
    useGetConversationMutation,
    useNewMessageMutation,
    useGetMessagesQuery,
} = conversationApi;  