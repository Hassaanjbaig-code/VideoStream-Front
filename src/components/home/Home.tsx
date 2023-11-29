import Card from "./Card";
import { useStartVideoQuery } from "../../redux/FetchApi/VideoFetch/Video";
import { VideoData } from "../../vite-env";

const Home = () => {
  const { isLoading, data } = useStartVideoQuery();
  return (
    <section className="w-full max-h-full min-h-screen">
      <ul className="flex flex-wrap justify-between h-full my-5">
        {isLoading ? (
          <h4>Loading ...</h4>
        ) : (
          data?.data.map((videoData: VideoData, index: number) => (
            <Card key={index} Video={videoData.video} />
          ))
        )}
      </ul>
    </section>
  );
};

export default Home;
