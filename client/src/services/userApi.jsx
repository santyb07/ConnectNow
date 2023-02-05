import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080/api/v1/user/"
    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(userData)=>({
                url:'register',
                method:'POST',
                body:userData,
                headers:{
                    'Content-type':'application/json',
                }
            })
        }),
        activateAccount: builder.mutation({
            query:(activation_token)=>({
                url:"activate",
                method:"POST",
                body:activation_token,
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json'
                }
            })
        }),
        loginUser: builder.mutation({
            query:(user)=>({
                url:'login',
                method:"POST",
                body:user,
                headers:{
                    'Content-type':'application/json'
                }
            })
        }),
        generateOTP: builder.mutation({
            query:(email)=>({
                url:'generateOTP',
                method:"POST",
                body:email,
                headers:{
                    'Content-type':'application/json'
                }
            })
        }),
        verifyOTP:builder.mutation({
            query:(OTP)=>({
                url:'verifyOTP',
                method:'POST',
                body:OTP,
                headers:{
                    'Content-type':'application/json'
                }
            })
        }),
        forgotPassword:builder.mutation({
            query:(password)=>({
                url:'resetPassword',
                method:'PUT',
                body:password,
                headers:{
                    'Content-type':'application/json'
                }
            })
        }),
        getAllUsers:builder.query({
            query:(token)=>({
                url:'users',
                method:"GET",
                headers:{
                    'authorization' : token,
                }
            })
        })
        
    })
})

export const {
    useRegisterUserMutation, 
    useActivateAccountMutation,
    useLoginUserMutation,
    useGenerateOTPMutation,
    useVerifyOTPMutation,
    useForgotPasswordMutation,
    useGetAllUsersQuery
} = userApi;  