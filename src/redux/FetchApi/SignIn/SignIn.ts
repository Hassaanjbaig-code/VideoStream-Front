import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SignInQueryState, SignInRequest } from "../../../vite-env"
import { Url } from "../../../hooks/auth"

export const SignIn = createApi({
    reducerPath: "SignIn",
    baseQuery: fetchBaseQuery({
        baseUrl: Url
    }),
    endpoints: (builder) => ({
        logIn: builder.mutation<SignInQueryState, SignInRequest>({
            query: (data) => ({
                url: "/user/LogIn",
                method: "POST",
                body: data
            }) 
        }),
        resend: builder.mutation<String, String>({
            query: (email) => ({
                url: `/resendLink/${email}`,
                method: "GET"
            })
        })
    })
})

export const { useLogInMutation, useResendMutation } = SignIn

