import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Subscriberstype,
  VideoDataWithChannels,
  likeRequest,
  videoType,
  Comment,
  showComments,
  commentlike,
  commentDelete,
  VideoFormData
} from "../../../vite-env";

interface tokenImport {
  token: string;
  channel: string;
}
const token: tokenImport = JSON.parse(
  localStorage.getItem("User Detail") || "{}"
);

console.log(token)

// console.log(token.token)

// const tokenJson: tokenImport = JSON.parse(token)

export const FetchVideo = createApi({
  reducerPath: "FetchVideo",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  }),
  tagTypes: ["Video", "showVideo", "Comment"],
  endpoints: (builder) => ({
    startVideo: builder.query<VideoDataWithChannels[], void>({
      // Define your query function here
      query: () => "/",
      providesTags: ["Video"],
    }),
    addVideo: builder.mutation<VideoFormData, any>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Video"],
    }),
    showVideo: builder.query<videoType, String>({
      query: (id) => `/${id}`,
      providesTags: ["Video", "showVideo"],
    }),
    addLike: builder.mutation<likeRequest, String>({
      query: (data) => ({
        url: `/like/${data}`,
        method: "GET",
      }),
      // You can specify the expected return type (void in this example)
      invalidatesTags: ["showVideo"],
    }),
    addDisLike: builder.mutation<likeRequest, String>({
      query: (data) => ({
        url: `/Dislike/${data}`,
        method: "GET",
      }),
      // You can specify the expected return type (void in this example)
      invalidatesTags: ["showVideo"],
    }),
    addSubecribe: builder.mutation<Subscriberstype, string>({
      query: (id) => ({
        url: `/subscribe/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["showVideo"],
    }),
    addComment: builder.mutation<Comment, Comment>({
      query: ({ id, commentData }: Comment) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["showVideo", "Comment"],
    }),
    showComment: builder.query<showComments, String>({
      query: (id) => `/comment/${id}`,
      providesTags: ["Comment", "showVideo"],
    }),
    addLikeComment: builder.mutation<commentlike, String>({
      query: (id) => ({
        url: `/commentLike/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Comment"],
    }),
    addDisLikeComment: builder.mutation<commentlike, String>({
      query: (id) => ({
        url: `/commentDislike/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComent: builder.mutation<commentDelete, string>({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
        // credentials: 'include'
      }),
      invalidatesTags: ["Comment", "showVideo"],
    }),
  }),
});

export const {
  useStartVideoQuery,
  useAddVideoMutation,
  useShowVideoQuery,
  useAddLikeMutation,
  useAddSubecribeMutation,
  useAddDisLikeMutation,
  useAddCommentMutation,
  useShowCommentQuery,
  useAddLikeCommentMutation,
  useAddDisLikeCommentMutation,
  useDeleteComentMutation
} = FetchVideo;
