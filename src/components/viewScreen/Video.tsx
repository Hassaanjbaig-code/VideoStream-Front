import React, { useRef, useEffect, useState } from "react";
import { PiSpeakerHighDuotone, PiSpeakerNoneDuotone } from "react-icons/pi";
import { AiOutlineSetting } from "react-icons/ai";
import { BsFullscreen } from "react-icons/bs";

interface VideoProps {
  playVideo: string | undefined;
  image: string | undefined;
}

const Video: React.FC<{ props: VideoProps }> = ({ props }) => {
  const { playVideo, image } = props;
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  // const [playPause, setPlayPause] = useState(true);
  const [volume, setVolume] = useState(1);
  const [hiddenVolume, setHiddenVolume] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [PlayBackSpeed, setPlaybackSpeed] = useState("");
  const [setting, setSetting] = useState(false);
  const [FullScreen, setFullScreen] = useState(false);

  const speedMapping: {
    [key: string]: number;
  } = {
    "2x": 2,
    "1.5x": 1.5,
    Normal: 1,
    "0.75x": 0.75,
    "0.5x": 0.5,
  };
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleTime = () => {
        let currentMinutes = Math.floor(video.currentTime / 60);
        let currentSeconds = Math.floor(
          video.currentTime - currentMinutes * 60
        );
        let durationMinutes = Math.floor(video.duration / 60);
        let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

        setCurrentTime(
          `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`
        );
        setDuration(
          `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`
        );

        if (video.duration !== 0) {
          setProgress((video.currentTime / video.duration) * 100);
        }
      };

      video.addEventListener("timeupdate", handleTime);

      return () => {
        video.removeEventListener("timeupdate", handleTime);
      };
    }
  }, []);

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      videoRef.current.volume = newVolume;
    }
  }

  function handleProgressBarClick(e: React.MouseEvent<HTMLElement>) {
    if (videoRef.current) {
      const pos =
        (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) *
        videoRef.current.duration;
      videoRef.current.currentTime = pos;
    }
  }

  function handlePlayPause() {
    let video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
  function handleFullScreen() {
    let video = videoRef.current;

    if (!FullScreen && video) {
      // If FullScreen is false and the video exists, request fullscreen
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.requestFullscreen) {
        /* IE/Edge */
        video.requestFullscreen();
      } else if (document.documentElement.mozFullScreenEnabled) {
        /* Firefox */
        video.requestFullscreen();
      }

      setFullScreen(true); // Toggle FullScreen state to true
    } else {
      // Handle exiting fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        /* IE/Edge */
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      }

      setFullScreen(false); // Toggle FullScreen state to false
    }
  }

  function handleVolumeHidden() {
    setHiddenVolume(!hiddenVolume);
  }
  function changePlaybackSpeed(speed: string) {
    console.log(speed);
    if (speed in speedMapping && videoRef.current) {
      const floatSpeed = speedMapping[speed];
      videoRef.current.playbackRate = floatSpeed;
      setPlaybackSpeed(speed);
      setSetting(false);
    }
  }

  return (
    <section
      className="relative h-[30rem] flex justify-center items-center "
      onClick={handlePlayPause}
    >
      <video
        preload="auto"
        ref={videoRef}
        src={playVideo}
        poster={image}
        autoPlay
        className="object-fill h-full w-full rounded-xl relative"
      />
      <aside className="absolute left-0 bottom-3 z-30 w-full controller_animate">
        <ul className="flex items-center justify-around w-[95%] mx-auto">
          <li>
            <p className="text-[#ffff] text-[12px] w-20 xl:font-medium  max-sm:w-20">
              <span>{currentTime}</span> / <span>{duration}</span>
            </p>
          </li>
          <li
            className="md:w-[70%] w-[49%] rounded-full h-2 cursor-pointer bg-gray-300"
            onClick={handleProgressBarClick}
          >
            <div
              className="h-2 bg-[#E72020] rounded-full"
              style={{ width: `${progress}%` }}
              onClick={handleProgressBarClick}
            ></div>
          </li>
          <li className="flex gap-6 mx-2 items-center">
            <button type="button" onClick={handleVolumeHidden}>
              {volume !== 0 ? (
                <PiSpeakerHighDuotone size={20} />
              ) : (
                <PiSpeakerNoneDuotone size={20} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              value={volume}
              onChange={handleVolume}
              step="0.1"
              className={`${
                hiddenVolume ? "block" : "hidden"
              } transform -rotate-90 origin-left absolute bottom-[14px] ml-3 h-4 w-40`}
            />
            <li
              className={`w-40 h-48 absolute right-[8px] bottom-[43px] border ${
                setting ? "block" : "hidden"
              }`}
            >
              <ul className="z-10 bg-slate-400 flex flex-col">
                {Object.keys(speedMapping).map((result, index) => (
                  <li
                    className={`text-center p-2 hover:bg-orange-300 ${
                      result == PlayBackSpeed && "bg-orange-600"
                    }`}
                    key={index}
                    onClick={() => changePlaybackSpeed(result)}
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </li>
            <button
              type="button"
              className="md:w-5 w-3"
              onClick={() => setSetting(!setting)}
            >
              <AiOutlineSetting size={25} />
            </button>
            <button
              type="button"
              className="md:w-5 w-3"
              onClick={handleFullScreen}
            >
              <BsFullscreen size={20} />
            </button>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default Video;
