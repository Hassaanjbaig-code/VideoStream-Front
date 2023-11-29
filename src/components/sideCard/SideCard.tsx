import React, { useRef } from "react";
import { videoAddData } from "../../vite-env";

const SideCard = ({
  data,
  channelName,
}: {
  data: videoAddData;
  channelName: string;
}) => {
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
    <li className="flex gap-4" key={data._id}>
      <video
        className="object-cover w-[60%] rounded-lg"
        src={data.video}
        poster={data.image}
        ref={videoref}
        onMouseEnter={handleStart}
        onMouseLeave={handlePause}
      />
      <div className="w-[30%] max-md:w-full flexs flex-col gap-3">
        <h2 className="text-lg my-2 font-sans text-gray-200 font-bold">{data.title}</h2>
        {/* <div className="flex gap-2"> */}
          {/* <img src={channelImage} alt="" className="w-10 h-8 rounded-full" /> */}
          <h2 className="text-gray-500">{channelName}</h2>
        {/* </div> */}
        {/* <ul className="text-gray-500 flex gap-3"> */}
        <p className="text-gray-500">{data.View} Views</p>
        {/* <li>month</li> */}
        {/* </ul> */}
      </div>
    </li>
  );
};

export default SideCard;
