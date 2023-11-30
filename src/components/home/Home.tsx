import Card from "./Card";
import { useStartVideoQuery } from "../../redux/FetchApi/VideoFetch/Video";
import { HomeVideo, VideoData } from "../../vite-env";

const Home = () => {
  const { isLoading, data } = useStartVideoQuery();
  // console.log(data?.data)
  
  return (
    <section className="w-full max-h-full min-h-screen">
      {/* {data?.data.length == 0 && (
        <div>
          <p>Please sign in and Add a video</p>
        </div>
      )} */}
      <ul className="flex flex-wrap justify-between h-full my-5">
        {isLoading ? (
          <h4>Loading ...</h4>
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
