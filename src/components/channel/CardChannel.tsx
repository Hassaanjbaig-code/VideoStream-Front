import { RefObject, useRef, useState } from "react";
import { Video } from "../../vite-env";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { useVideoDeleteMutation } from "../../redux/FetchApi/channel/Channel";

const CardChannel = ({ Video }: { Video: Video }) => {
  const videoPlayPause: RefObject<HTMLVideoElement> = useRef(null);

  const handleStart = () => {
    if (videoPlayPause.current) {
      videoPlayPause.current.play()
    }
  };

  let navigate = useNavigate();
  let [videoDelete] = useVideoDeleteMutation()

  const [DeleteClick, setDeleteCLick] = useState(false);
  const handleButton = () => {
    setDeleteCLick(!DeleteClick);
    console.log(DeleteClick);
  };
  

  function handleDelete(value:string) {
    console.log(value)
    videoDelete(value)
  }

  function strSmall(str: string) {
    return str.slice(0, 30);
  }

  const handlePause = () => {
    if (videoPlayPause.current) {
      videoPlayPause.current.pause();
    }
  };
  return (
    <li id={Video?._id} className="mx-2 flex flex-col gap-3">
      <Link to={`/${Video._id}`} className="flex flex-col gap-2 w-60">
        <video
          src={Video.video}
          width={380}
          height={240}
          ref={videoPlayPause}
          onMouseEnter={handleStart}
          onMouseLeave={handlePause}
          poster={Video.image}
          preload="auto"
          className="rounded-lg object-cover"
          muted
        />
      </Link>
      <div className="flex gap-6 items-center relative">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex w-full justify-between">
            <h3
              className="font-mono font-extrabold text-xl"
              onClick={() => navigate(`/${Video._id}`)}
            >
              {Video.title}
            </h3>
            {DeleteClick && (
              <div className="z-50 bg-gray-500 absolute right-0 bottom-12 w-32 h-16 flex text-center justify-center">
                <button
                  type="button"
                  className="py-2 px-1 hover:bg-gray-800 w-full h-full"
                  onClick={() => handleDelete(Video._id)}
                >
                  Delete
                </button>
              </div>
            )}
            <button type="button" onClick={handleButton}>
              <CiMenuKebab />
            </button>
          </div>
          <p className="text-sm text-gray-400">{strSmall(Video.description)}</p>
        </div>
      </div>
    </li>
  );
};

export default CardChannel;
