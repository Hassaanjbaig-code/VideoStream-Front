import { useParams } from "react-router-dom";
import { useShowVideoMutation } from "../../redux/FetchApi/VideoFetch/Video";
import Comments from "../comment/Comments";
import ShowComment from "../comment/ShowComment";
import SideCard from "../sideCard/SideCard";
import IntroVideo from "./IntroVideo";
import VideoAbout from "./VideoAbout";
import { Check } from "../../hooks/Button";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../input/Auth";
import Alert from "../alert/Alert";
import Video2 from "./Video2";

const ViewScreen = () => {
  const { id } = useParams();
  const [showVideo, { isLoading, data }] = useShowVideoMutation();
  const [checkSignin, setCheckSignIn] = useState(false);

  useEffect(() => {
    showVideo(id);
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setCheckSignIn(false);
    }, 3000);
  }, [checkSignin]);

  // Return loading indicator if data is still loading
  isLoading && (
    <div className="w-full h-screen flex justify-center items-center" >
      <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
    </div>
  );

  // Check for data existence
  Check(data);

  function checkSigIn() {
    if (isLoggedIn) {
      setCheckSignIn(true);
      return true;
    } else {
      setCheckSignIn(false);
      return false;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setCheckSignIn(false);
    }, 3000);
  }, [checkSignin]);

  return (
    <section
      className="flex gap-2 mt-5 pb-16 min-h-screen max-h-full md:ml-3 max-md:flex-col"
      key={data?.data._id}
    >
      <section className="md:w-[70%]">
        <Video2 VideoLink={data?.data.video} key={Math.random()} />
        <div className="flex flex-col my-5">
          <IntroVideo
            title={data?.data.title}
            image={data?.channel.image}
            name={data?.channel.name}
            view={data?.calculate}
            Like={data?.like}
            id={data?.data._id}
            checkSign={checkSigIn}
          />
        </div>
        <VideoAbout
          View={data?.data.View}
          description={data?.data.description}
          key={data?.data._id}
          createdAt={data?.data.createdAt}
        />
        <Comments totalComment={data?.TotalComment} videoID={data?.data._id} checkSignIn={checkSigIn} />
        <ShowComment id={data?.data._id} />
      </section>
      <section className="w-[30%] max-md:w-full">
        <SideCard data={data?.sideVideo} />
      </section>

      {checkSignin && <Alert mes="Please Sign In" />}
    </section>
  );
};

export default ViewScreen;
