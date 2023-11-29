import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SignUp = createApi({
  reducerPath: "SignUp", // Should match your store configuration
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // Adjust the base URL
  }),
  endpoints: (builder) => ({
    register: builder.mutation<ResultSignUp, SignUpRequest>({
      query: (data) => ({
        url: "/user/SignUp", // Adjust the URL
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = SignUp;
