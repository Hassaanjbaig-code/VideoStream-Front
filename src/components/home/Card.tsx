import { useRef, RefObject } from "react";
import { Link } from "react-router-dom";
import { HomeVideo } from "../../vite-env";

const Card = ({ VideoData }: { VideoData: HomeVideo }) => {
  const Video = VideoData.video
  const videoPlayPause: RefObject<HTMLVideoElement> = useRef(null);

  const handleStart = () => {
    if (videoPlayPause.current) {
      videoPlayPause.current.play().catch((error) => {
        console.error("Autoplay was blocked:", error);
      });
    }
  };

  const handlePause = () => {
    if (videoPlayPause.current) {
      videoPlayPause.current.pause();
    }
  };

  return (
    <li key={Video._id} className="sm:my-2 mx-1 max-sm::w-full" id={Video._id}>
      <Link to={`/${Video._id}`} className="flex flex-col gap-2 w-96 h-80 max-sm:w-[95%] max-sm:mx-[3%]">
        <video
          src={Video.video}
          width={380}
          height={240}
          ref={videoPlayPause}
          onMouseEnter={handleStart}
          onMouseLeave={handlePause}
          poster={Video.image}
          preload="auto"
          className="rounded-lg object-fill w-full h-full"
          muted
        />
        <div className="flex gap-6 items-center">
          <div>
            <img
              src={Video.channel.image}
              alt="Profile pic"
              width={100}
              height={100}
              className="rounded-full w-14 h-14"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-mono font-extrabold text-xl">{Video.title}</h3>
            <h3 className="text-gray-400">{Video.channel.name}</h3>
            <p className="text-gray-400 text-sm">{Video.View} view</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Card;
