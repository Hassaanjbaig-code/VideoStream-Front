import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddLikeMutation,
  useShowVideoQuery,
  useAddSubecribeMutation,
  useAddDisLikeMutation,
} from "../../redux/FetchApi/VideoFetch/Video";
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";
import Comments from "../comment/Comments";
import { likeRequest, tokenImport } from "../../vite-env";
import ShowComment from "../comment/ShowComment";
import SideCard from "../sideCard/SideCard";
import Video from "./Video";
import SHare from "./SHare";
import IntroVideo from "./IntroVideo";

const ViewScreen = () => {
  const { id } = useParams();
  // const [clickLike, setLike] = useState(false);
  let clickSubscribe = false;
  const { isLoading, data } = useShowVideoQuery(String(id));
  if (isLoading) return <h1>Loading ....</h1>;
  return (
    <main
      className="flex gap-2 my-5 min-h-screen max-h-full md:ml-3 max-md:flex-col"
      key={data?.data._id}
    >
      <section className="md:w-[70%]">
        <Video
          props={{ playVideo: data?.data.video, image: data?.data.image }}
        />
        <div className="flex flex-col mx-5 my-7">
          <IntroVideo
            title={data?.data.title}
            image={data?.channel.image}
            name={data?.channel.name}
            view={data?.calculate}
            Like={data?.like}
            id={data?.data._id}
          />

        </div>
      </section>
    </main>
  );
};

export default ViewScreen;
