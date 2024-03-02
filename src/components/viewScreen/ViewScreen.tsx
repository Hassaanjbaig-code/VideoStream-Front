import { useParams } from "react-router-dom";
import {
  useShowVideoQuery,
} from "../../redux/FetchApi/VideoFetch/Video";
import Comments from "../comment/Comments";
import ShowComment from "../comment/ShowComment";
import SideCard from "../sideCard/SideCard";
import Video from "./Video";
import IntroVideo from "./IntroVideo";
import VideoAbout from "./VideoAbout";
import { Check } from "../../hooks/Button";

const ViewScreen = () => {
  const { id } = useParams();
  const { isLoading, data } = useShowVideoQuery(String(id));
  if (isLoading) return <h1>Loading ....</h1>;
  Check(data)
  return (
    <section
      className="flex gap-2 mt-5 pb-16 min-h-screen max-h-full md:ml-3 max-md:flex-col"
      key={data?.data._id}
    >
      <section className="md:w-[70%]">
        <Video
          props={{ playVideo: data?.data.video, image: data?.data.image }}
        />
        <div className="flex flex-col my-5">
          <IntroVideo
            title={data?.data.title}
            image={data?.channel.image}
            name={data?.channel.name}
            view={data?.calculate}
            Like={data?.like}
            id={data?.data._id}
          />
        </div>
        <VideoAbout
          View={data?.data.View}
          description={data?.data.description}
          key={data?.data._id}
          createdAt={data?.data.createdAt}
        />
        <Comments totalComment={data?.TotalComment} videoID={data?.data._id} />
        <ShowComment id={data?.data._id} />
      </section>
      <section className="w-[30%] max-md:w-full">
        <SideCard data={data?.sideVideo} />
      </section>
    </section>
  );
};

export default ViewScreen;
