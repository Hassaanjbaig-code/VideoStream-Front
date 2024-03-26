import React, { useRef } from "react";
import { sideoVideos } from "../../vite-env";
import { Link } from "react-router-dom";

interface SideVideo {
  data: sideoVideos[] | undefined;
}

const SideCard = ({ data }: SideVideo) => {
  const videoref: React.RefObject<HTMLVideoElement> = useRef(null);
  // const [videoPlay, setVideoPplay] = useState(false)
  const handleStart = () => {
    if (videoref.current) {
      videoref.current.play().catch((error) => {
        // Handle autoplay blocked error here
        console.error("Autoplay was blocked:", error);
      });
    }
  };

  const handlePause = () => {
    if (videoref.current) {
      videoref.current.pause();
    }
  };
  return (
    <ul className="w-full flex flex-col gap-3 max-md:mb-16">
      {data?.map((result) => (
        <li key={result.video._id}>
          <Link to={`/${result.video._id}`} className="flex gap-4">
            <video
              className="object-fill w-[60%] h-32 rounded-lg"
              src={result.video.video}
              poster={result.video.image}
              ref={videoref}
              onMouseEnter={handleStart}
              onMouseLeave={handlePause}
            />
            <div className="w-[30%] max-md:w-full flexs flex-col gap-3">
              <h2 className="text-lg my-2 font-sans text-gray-200 font-bold">
                {result.video.title}
              </h2>
              {/* <div className="flex gap-2"> */}
              {/* <img src={channelImage} alt="" className="w-10 h-8 rounded-full" /> */}
              <h2 className="text-gray-500">{result.channelName}</h2>
              {/* </div> */}
              {/* <ul className="text-gray-500 flex gap-3"> */}
              <p className="text-gray-500">{result.video.View} Views</p>
              {/* <li>month</li> */}
              {/* </ul> */}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideCard;
