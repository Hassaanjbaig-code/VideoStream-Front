import Card from "./Card";
import { useStartVideoQuery } from "../../redux/FetchApi/VideoFetch/Video";
import { HomeVideo } from "../../vite-env";
import ReactLoading from "react-loading";

const Home = () => {
  const { isLoading, data } = useStartVideoQuery();
  // console.log(data?.data)

  return (
    <section className="w-full max-h-full min-h-screen">
      <ul className="flex flex-wrap h-full my-5">
        {isLoading ? (
          <div>
            <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
          </div>
        ) : (
          data?.data.map((videoData: HomeVideo, index: number) => (
            <Card key={index} VideoData={videoData} />
          ))
        )}
      </ul>
    </section>
  );
};

export default Home;
