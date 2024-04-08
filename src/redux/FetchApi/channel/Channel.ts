import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChannelDetail, SignInQueryState } from "../../../vite-env";
import { Url } from "../../../hooks/auth";
import { user } from "../../../components/input/Auth";

export const channel = createApi({
  reducerPath: "channel",
  baseQuery: fetchBaseQuery({
    baseUrl: Url,
    headers: {
      authorization: `Bearer ${user.value?.token}`,
    },
  }),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    createChannel: builder.mutation<SignInQueryState, any>({
      query: (data) => ({
        url: "/channel",
        method: "POST",
        body: data,
      })
    }),
    channelInfo: builder.query<ChannelDetail, void>({
      query: () => "/user/ChannelDetail",
      providesTags: ["Video"]
    }),
    videoDelete: builder.mutation<String, String>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Video"]
    }),
  }),
});

export const {
  useCreateChannelMutation,
  useChannelInfoQuery,
  useVideoDeleteMutation,
} = channel;
