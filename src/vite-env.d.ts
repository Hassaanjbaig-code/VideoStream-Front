/// <reference types="vite/client" />

import { AnyObject } from "mongoose";

type ApiResponse =
  | {
      status: number; // Success status code
      data: {
        message: string;
      };
    }
  | {
      status: number;
      error: {
        status: number;
        data: {
          message: string;
        };
      };
    };

interface videoAddData {
  _id: string;
  title: string;
  description: string;
  image: string;
  video: string;
  View: number;
}

type SigUpProps = {
  handleError: (error: string, status: number) => void;
};

interface handleVideoSubmit {
  title: string;
  description: string;
  image: string;
  video: Object;
  channelId: Object;
}

interface VideoFormData {
  title: string;
  description: string;
  image?: File | null;
  video?: File | null;
}

interface ChannelFormData {
  name: string;
  description: string;
  image?: File | null;
}

interface ChannelFormError {
  status: number;
  message: string;
}

interface handleCreateChannel {
  name: string;
  description: string;
  image: string;
}

type CustomResponseSignIn = {
  data: {
    message?: string;
    token?: string;
    status: number;
    verify: boolean;
    channel: {
      status: Number;
      message: String;
    };
  };
};

type CustomResponseSignInError = {
  data: {
    status: Number;
    message: string;
  };
};

type QueryState<TData, TError> = {
  token: any;
  channel: any;
  data?: TData;
  error?: TError;
  status: QueryStatus;
};

type SignInQueryState = QueryState<
  CustomResponseSignIn["data"],
  CustomResponseSignInError["data"]
>;

type SignUpQueryState = QueryState<
  ResultSignUp["data"],
  CustomResponseSignInError["data"]
>;

type ResultSignUp = {
  message: string;
};

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface FetchVideo {
  title: string;
  description: string;
  image: string;
  video: string;
}

interface SigUpProps {
  handleError: (error: string) => void;
}

type videoType = {
  channel: {
    _id: string;
    name: string;
    description: string;
    image: string;
    user: string;
  };
  data: {
    _id: string;
    title: string;
    description: string;
    image: string;
    video: string;
    channel: string;
    View: number;
    createdAt: string;
    updatedAt: string;
  };
  calculate: number;
  like: number;
  comment: {
    _id: string;
    comment: string;
    video: string;
    channel: string;
  };
  TotalComment: number;
  Like: LikeType[];
  DisLike: LikeType[];
  subscribe: SubscribeType[];
  sideVideo: sideoVideos[];
};

interface sideoVideos {
  video: videoAddData;
  channelName: string;
  channelImage: string;
}

interface tokenImport {
  token: string;
  channel: channelToken;
}

interface channelToken {
  status: number;
  message: string;
}

interface channelInfo {
  status: number;
  data: {
    _id: string;
    name: string;
    image: string;
    description: string;
    user: string;
  };
}

interface channelButton {
  AddNew: boolean;
  SwitchAccount: boolean;
}

interface SignAnotheProps {
  close: ReactEventHandler<HTMLButtonElement>;
}

interface tokenImport {
  token: {
    status: Number;
    message: String;
  };
  channel: string;
}

interface channel {
  _id: string;
  name: string;
  image: string;
  description: string;
  user: string;
}

interface ChannelDetail {
  data: {
    channel: channel;
    subscribe: number;
    video: Video[];
  };
  status: number;
}

type Video = {
  _id: string;
  title: string;
  description: string;
  image: string;
  video: string;
  channel: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  View: number;
};

type SubscribeType = {
  _id: string;
  count: boolean;
  mainChannel: string;
  subScribeChannel: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type LikeType = {
  _id: string;
  count: number;
  video: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface Like {
  count: number;
  video: string;
  channel: string;
}

interface likeRequest {
  status: number;
  message: number;
}

interface commentlike {
  status: number;
  message: String;
}

interface Subscriberstype {
  status: number;
  message: number | string;
}

interface commentDelete {
  data: {
    status: number;
    message: string;
  };
}

interface HomeVideo {
  video: {
    _id: string;
    title: string;
    description: string;
    image: string;
    video: string;
    View: number;
    channel: {
      _id: string;
      name: string;
      image: string;
    };
  };
}

type VideoDataWithChannels = {
  status: number;
  data: HomeVideo[];
};

type VideoData = {
  video: {
    _id: string;
    title: string;
    description: string;
    image: string;
    video: string; // Add the missing 'video' field
    View: number;
    channel: {
      _id: string;
      name: string;
      image: string;
    };
  };
};

interface Comment {
  id: string | undefined;
  commentData: {
    comment: string;
  };
}

interface CommentPost {
  id: string;
  data: {
    comment: string;
  };
}

interface showComments {
  status: number;
  video: {
    comments: comment[];
  };
}

interface comment {
  _id: String;
  Comment: String;
  video: String;
  channel: {
    _id: string;
    name: string;
    description: string;
    image: string;
    user: string;
  };
}
