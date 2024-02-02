import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SignInQueryState, SignInRequest } from "../../../vite-env"

export const SignIn = createApi({
    reducerPath: "SignIn",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (builder) => ({
        logIn: builder.mutation<SignInQueryState, SignInRequest>({
            query: (data) => ({
                url: "/user/LogIn",
                method: "POST",
                body: data
            }) 
        })
    })
})

export const { useLogInMutation } = SignIn

