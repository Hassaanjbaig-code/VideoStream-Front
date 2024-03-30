import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { SignInError, SignInQueryState, SignInRequest } from "../../../vite-env"
import { Url } from "../../../hooks/auth"

export const SignIn = createApi({
    reducerPath: "SignIn",
    baseQuery: fetchBaseQuery({
        baseUrl: Url
    }) as BaseQueryFn<SignInQueryState | FetchArgs, unknown, SignInError | FetchBaseQueryError , {}>,
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

