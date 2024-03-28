import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignUpQueryState, SignUpRequest } from "../../../vite-env";
import { Url } from "../../../hooks/auth";

export const SignUp = createApi({
  reducerPath: "SignUp", // Should match your store configuration
  baseQuery: fetchBaseQuery({
    baseUrl: Url,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<SignUpQueryState, SignUpRequest>({
      query: (data) => ({
        url: "/user/SignUp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = SignUp;
