import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResendError, ResendSuccess, SignUpQueryState, SignUpRequest } from "../../../vite-env";
import { Url } from "../../../hooks/auth";

export const SignUp = createApi({
  reducerPath: "SignUp", // Should match your store configuration
  baseQuery: fetchBaseQuery({
    baseUrl: Url,
  }) as BaseQueryFn<string | FetchArgs, unknown, ResendError , {}>,
  // tagTypes: ["Resend"],
  endpoints: (builder) => ({
    register: builder.mutation<SignUpQueryState, SignUpRequest>({
      query: (data) => ({
        url: "/user/SignUp",
        method: "POST",
        body: data,
      }),
    }),
    resendEmail: builder.mutation<ResendSuccess, {email: string}>({
      query: (email) => ({
        url: `/resendLink/${email.email}`,
        method: "GET"
      }),
      // transformErrorResponse: (result) => result.data,
      // invalidatesTags: (result, error, { email }) => [{ type: "Resend", email, error, result }]
    })
  }),
});

export const { useRegisterMutation, useResendEmailMutation } = SignUp;
