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
import { signal } from "@preact/signals-react";

const ViewScreen = () => {
  const { id } = useParams();
  const [clickLike, setLike] = useState(false);
  const [clickDisLike, setDisLike] = useState(false);
  const [clickSubscribe, setSubscribe] = useState(false);
  const [clickShare, setShare] = useState(false);
  // let chicklikes = signal(false)

  const token: tokenImport = JSON.parse(
    localStorage.getItem("User Detail") || "{}"
  );
  console.log(token.channel.message);

  const [addLike] = useAddLikeMutation();
  const [addDisLike] = useAddDisLikeMutation();
  const [addSubecribe] = useAddSubecribeMutation();

  // Check if id is defined before making the query
  // const { isLoading, data } = id ? useShowVideoQuery(String(id)) : { isLoading: false, data: undefined };
  const { isLoading, data } = useShowVideoQuery(String(id));
  //   // console.log(data?.subscribe)
  // console.log(data?.Like)
  // console.log(token.channel)
  console.log(data);
  // const { isSuccess, error } = useAddLikeQuery(;

  // console.log(data);

  useEffect(() => {
    data?.Like.map((LikeData) => {
      if (LikeData.channel == token.channel.message) {
        setLike(true);
      } else {
        setLike(false);
      }
    });

    data?.subscribe.map((subScribe) => {
      setSubscribe(subScribe.mainChannel == token.channel.message);
    });

    data?.DisLike.map((disLikes) => {
      setDisLike(disLikes.channel == token.channel.message);
    });
  }, [data, token]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  function convertDateToMonthOrDaysAgo(GivenDate: string | Date | undefined) {
    const today: Date = new Date();
    const givenDate: Date = GivenDate ? new Date(GivenDate) : today;

    // Calculate the difference in milliseconds
    const timeDifference = today.getTime() - givenDate.getTime();

    // Calculate the number of days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference < 30) {
      // If it's less than a month, return the number of days
      return (
        Math.round(daysDifference) +
        " day" +
        (Math.round(daysDifference) === 1 ? "" : "s") +
        " ago"
      );
    } else {
      // If it's a month or more, return the number of months
      const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30.44);
      const monthsDifferenceRounded = Math.round(monthsDifference);
      return (
        monthsDifferenceRounded +
        " month" +
        (monthsDifferenceRounded === 1 ? "" : "s") +
        " ago"
      );
    }
  }

  const HandleLike: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const response = await addLike(String(data?.data._id));
    console.log(response);
    const likeData = response.data as likeRequest;
    if (likeData) {
      setLike(!clickLike);
    }
  };
  // const HandleDisLike: React.MouseEventHandler<HTMLButtonElement> = async () => {
  //   const response = await addDisLike(String(data?.data._id));
  //   console.log(response);
  //    const likeData = response.data as likeRequest
  //   if (likeData) {
  //     setLike(!clickLike);
  //   }
  // };

  return (
    <section
      className="flex gap-2 min-h-screen max-h-full md:ml-3 max-md:flex-col"
      key={data?.data._id}
    >
      <div className="md:w-[70%]">
        <div>
          <Video
            props={{ playVideo: data?.data.video, image: data?.data.image }}
          />
        </div>
        <div className="flex flex-col mx-5 my-7">
          <h2 className="text-xl font-bold ">{data?.data.title}</h2>
          <div className="my-6 flex md:items-center w-full justify-between max-md:flex-col max-md:gap-3">
            <div className="flex max-md:justify-between md:gap-3">
              <div className="flex gap-3 items-center">
                <img
                  src={data?.channel.image}
                  alt={data?.channel.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col">
                  <h3 className="font-bold text-2xl">{data?.channel.name}</h3>
                  <h5 className="text-gray-400 text-sm">
                    {data?.calculate} Subscribe
                  </h5>
                </div>
              </div>
              <button
                type="button"
                onClick={() => addSubecribe(String(data?.data.channel))}
                className={`md:w-36 w-24 h-16 text-black rounded-3xl md:text-xl text-sm hover:bg-red-500 ${
                  clickSubscribe ? "bg-red-600" : "bg-white"
                }`}
              >
                Subscribe
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="w-24 h-14 bg-black/40 rounded-xl flex items-center justify-around"
                onClick={HandleLike}
              >
                <AiTwotoneLike
                  size={30}
                  color={clickLike ? "#b03030ad" : "#fff"}
                />
                <span className="text-lg">{data?.like}</span>
              </button>
              <button
                type="button"
                className="w-[3rem] h-14 bg-black/40 rounded-xl flex items-center justify-around"
                onClick={() => !clickLike && addDisLike(String(data?.data._id))}
              >
                <AiTwotoneDislike
                  size={30}
                  color={clickDisLike ? "#b03030ad" : "#fff"}
                />
              </button>
              <button
                type="button"
                className="w-28 h-14 bg-black/40 rounded-xl flex items-center justify-around"
                onClick={() => setShare(!clickShare)}
              >
                <PiShareFatFill size={30} />
                Share
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-gray-500 flex gap-3">
              <h5>{convertDateToMonthOrDaysAgo(data?.data.createdAt)}</h5>
              <h5>{data?.data.View} View</h5>
            </div>
            <h2 className="my-3 max-md:my-1 text-lg ">
              {data?.data.description}
            </h2>
          </div>
          <Comments
            totalComment={data?.TotalComment}
            videoID={data?.data._id}
          />
          <ShowComment id={data?.data._id} />
        </div>
      </div>
      <ul className="w-[30%] max-md:w-full flex flex-col gap-3 max-md:mb-16">
        {data?.sideVideo.map((result) => (
          <SideCard data={result.video} channelName={result.channelName} />
        ))}
      </ul>
      {clickShare && (
        <div className="fixed z-50 top-0 left-0 flex justify-center items-center w-full h-full bg-transparent">
          <SHare />
        </div>
      )}
    </section>
  );
};

export default ViewScreen;
