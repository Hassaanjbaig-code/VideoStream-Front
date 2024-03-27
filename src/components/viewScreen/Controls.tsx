import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BsFullscreen } from "react-icons/bs";
import { IoPause, IoPlay } from "react-icons/io5";
import { PiSpeakerHighDuotone, PiSpeakerNoneDuotone } from "react-icons/pi";
import ReactPlayer from "react-player";

type ControlsProps = {
  playing: boolean;
  setting: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setSetting: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<{ speed: number; open: boolean }>>;
  playedSeconds: number;
  duration: number;
  playerRef: MutableRefObject<ReactPlayer>;
  volume: { speed: number; open: boolean };
  speedMapping: Object;
  PlayBackSpeed: { Selectedspeed: string; Speed: number };
  setPlayBackSpeed: Dispatch<
    SetStateAction<{ Selectedspeed: string; Speed: number }>
  >;
  toggleFullScreen: () => void;
};

const Controls = (props: ControlsProps) => {
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setVolume({ ...props.volume, speed: parseFloat(e.target.value) });
  };

  const handlePlayBackRate = ({
    speed,
    value,
  }: {
    speed: string;
    value: number;
  }) => {
    props.setPlayBackSpeed({ Selectedspeed: speed, Speed: value });
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDragging) {
      const slider = e.currentTarget;
      const rect = slider.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newProgress = (offsetX / rect.width) * 100;
      setProgress(newProgress);
      props.playerRef.current.seekTo(newProgress, "seconds");
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    handleTime();
  }, [props.playedSeconds]);

  const handleVolumeHidden = () => {
    props.setVolume({ ...props.volume, open: !props.volume.open });
  };

  function handleTime() {
    let currentMinutes = Math.floor(props.playedSeconds / 60);
    let currentSeconds = Math.floor(props.playedSeconds - currentMinutes * 60);

    let durationMinutes = Math.floor(props.duration / 60);
    let durationSeconds = Math.floor(props.duration - durationMinutes * 60);
    setCurrentTime(
      `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`
    );
    setDuration(
      `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`
    );

    setProgress((props.playedSeconds / props.duration) * 100);
  }

  return (
    <ul className="absolute left-0 bottom-2 z-30 w-full flex justify-around items-center">
      <li>
        <button onClick={() => props.setPlaying(!props.playing)}>
          {props.playing ? <IoPause /> : <IoPlay />}
        </button>
      </li>
      <li>
        <p className="text-[#ffff] text-[12px] w-20 xl:font-medium  max-sm:w-20">
          <span>{currentTime}</span> / <span>{duration}</span>
        </p>
      </li>
      <li
        className="md:w-[70%] w-[49%] rounded-full h-2 cursor-pointer bg-gray-300"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="h-2 bg-[#E72020] rounded-full"
          style={{ width: `${progress}%` }}
          onMouseDown={handleMouseDown}
        ></div>
      </li>
      <li className="flex gap-6 items-center">
        <button type="button" onClick={handleVolumeHidden}>
          {props.volume.speed !== 0 ? (
            <PiSpeakerHighDuotone size={20} />
          ) : (
            <PiSpeakerNoneDuotone size={20} />
          )}
        </button>
        <input
          type="range"
          value={props.volume.speed}
          onChange={handleVolumeChange}
          min="0"
          max="1"
          step="0.1"
          className={`${
            props.volume.open ? "block" : "hidden"
          } transform -rotate-90 origin-left absolute bottom-[14px] ml-3 h-4 w-40`}
        />
      </li>
      <li
        className={`w-40 h-48 absolute right-[8px] bottom-[43px] border ${
          props.setting ? "block" : "hidden"
        }`}
      >
        <ul className="z-10 bg-slate-400 flex flex-col">
          {Object.entries(props.speedMapping).map((key, value) => (
            <li
              className={`text-center p-2 hover:bg-orange-300
                ${
                  key[0] == props.PlayBackSpeed.Selectedspeed && "bg-orange-600"
                }
                `}
              key={value}
              onClick={() =>
                handlePlayBackRate({ speed: key[0], value: key[1] })
              }
            >
              {key[0]}
            </li>
          ))}
        </ul>
      </li>
      <li>
        <button
          type="button"
          className="md:w-5 w-3"
          onClick={() => props.setSetting(!props.setting)}
        >
          <AiOutlineSetting size={20} />
        </button>
      </li>
      <li>
        <button
          type="button"
          className="md:w-5 w-3"
          onClick={props.toggleFullScreen}
        >
          <BsFullscreen size={18} />
        </button>
      </li>
    </ul>
  );
};

export default Controls;
