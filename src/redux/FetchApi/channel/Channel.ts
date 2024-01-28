import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChannelDetail, ChannelFormData } from "../../../vite-env";

interface tokenImport {
  token: string;
  channel: string;
}
const token: tokenImport = JSON.parse(
  localStorage.getItem("User Detail") || "{}"
);

console.log(token)
export const channel = createApi({
  reducerPath: "channel",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  }),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    createChannel: builder.mutation<ChannelFormData, any>({
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
