import Card from "./Card";
import { useStartVideoQuery } from "../../redux/FetchApi/VideoFetch/Video";
import { HomeVideo } from "../../vite-env";
import ReactLoading from "react-loading";

const Home = () => {
  const { isLoading, data } = useStartVideoQuery();
  // console.log(data?.data)

  return (
    <section className="w-full max-h-full min-h-screen">
      <ul className={`flex flex-wrap h-full ${data?.data.length !== 0 && "my-5"}`}>
        {isLoading ? (
          <div className="flex h-screen w-full justify-center items-center">
            <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
          </div>
        ) : data?.data.length == 0 ? (
          <div className="flex h-screen w-full justify-center items-center">
            <h2 className="text-blue-400 font-bold text-2xl">
              Please add a Video By Sign In
            </h2>
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
