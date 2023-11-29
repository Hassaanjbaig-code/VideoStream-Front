import { configureStore } from "@reduxjs/toolkit";
import { SignUp } from "./FetchApi/SignUp/SignUp";
import { SignIn } from "./FetchApi/SignIn/SignIn";
import { FetchVideo } from "./FetchApi/VideoFetch/Video";
import { channel } from "./FetchApi/channel/Channel";

export const store = configureStore({
  reducer: {
    [SignUp.reducerPath]: SignUp.reducer,
    [SignIn.reducerPath]: SignIn.reducer,
    [FetchVideo.reducerPath]: FetchVideo.reducer,
    [channel.reducerPath]: channel.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(SignUp.middleware)
      .concat(SignIn.middleware)
      .concat(FetchVideo.middleware)
      .concat(channel.middleware)
});
