// import React, { useState, useRef } from "react";
// import ReactPlayer from "react-player";
import "./Video.css";
// import { PiSpeakerHighDuotone, PiSpeakerNoneDuotone } from "react-icons/pi";
// import { AiOutlineSetting } from "react-icons/ai";
// import { BsFullscreen } from "react-icons/bs";

// interface Video2 {
//   VideoLink: string | undefined;
// }

// const Video2 = ({ VideoLink }: Video2) => {
//   const [state, setState] = useState({
//     play: false,
//     currentTime: "0:00",
//     duration: "0:00",
//     volume: 1,
//     progress: 0,
//     hiddenVolume: false,
//     PlayBackSpeed: "",
//     setting: false,
//     FullScreen: false,
//   });

//   const playerRef = useRef(null)

//   const {
//     play,
//     currentTime,
//     duration,
//     volume,
//     progress,
//     hiddenVolume,
//     PlayBackSpeed,
//     setting,
//     FullScreen,
//   } = state;

//   const handleVolume = () => {

//   }

//   const playingState = () => {
//     setState({...state, play: !play})
//   }

//   const handleProgressBarClick = (e: React.MouseEvent<HTMLElement>) => {
//     playerRef.current.seekTo(e.nativeEvent.offsetX / e.currentTarget.offsetWidth)
//   }
//   return (
//     <section>
//         <button type="button" className="relative h-[30rem] flex justify-center items-center " onClick={playingState}>
//       <ReactPlayer
//         url={VideoLink}
//         height={"100%"}
//         width={"100%"}
//         playing={play}
//         ref={playerRef}
//       />
//       <aside className="absolute left-0 bottom-3 z-30 w-full controller_animate">
//         <ul className="flex items-center justify-around w-[95%] mx-auto">
//           <li>
//             <p className="text-[#ffff] text-[12px] w-20 xl:font-medium  max-sm:w-20">
//               <span>{currentTime}</span> / <span>{duration}</span>
//             </p>
//           </li>
//           <li
//             className="md:w-[70%] w-[49%] rounded-full h-2 cursor-pointer bg-gray-300"
//             onClick={handleProgressBarClick}
//           >
//             <div
//               className="h-2 bg-[#E72020] rounded-full"
//               style={{ width: `${progress}%` }}
//               onClick={handleProgressBarClick}
//             ></div>
//           </li>
//           <li className="flex gap-6 mx-2 items-center">
//             <button type="button" onClick={() => setState(!volume)}>
//               {volume !== 0 ? (
//                 <PiSpeakerHighDuotone size={20} />
//               ) : (
//                 <PiSpeakerNoneDuotone size={20} />
//               )}
//             </button>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               value={volume}
//               onChange={handleVolume}
//               step="0.1"
//               className={`${
//                 hiddenVolume ? "block" : "hidden"
//               } transform -rotate-90 origin-left absolute bottom-[14px] ml-3 h-4 w-40`}
//             />
//             <li
//               className={`w-40 h-48 absolute right-[8px] bottom-[43px] border ${
//                 setting ? "block" : "hidden"
//               }`}
//             >
//               <ul className="z-10 bg-slate-400 flex flex-col">
//                 {Object.keys(speedMapping).map((result, index) => (
//                   <li
//                     className={`text-center p-2 hover:bg-orange-300 ${
//                       result == PlayBackSpeed && "bg-orange-600"
//                     }`}
//                     key={index}
//                     onClick={() => changePlaybackSpeed(result)}
//                   >
//                     {result}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//             <button
//               type="button"
//               className="md:w-5 w-3"
//               onClick={() => setState(!setting)}
//             >
//               <AiOutlineSetting size={25} />
//             </button>
//             <button
//               type="button"
//               className="md:w-5 w-3"
//               onClick={handleFullScreen}
//             >
//               <BsFullscreen size={20} />
//             </button>
//           </li>
//         </ul>
//       </aside>
//       </button>
//     </section>
//   );
// };

// export default Video2;

import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import ReactPlayer from "react-player";
import { IoPlay, IoPause } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";

interface Video2 {
  VideoLink: string | undefined;
}

const Player = ({ VideoLink }: Video2) => {
  const [playing, setPlaying] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const [volume, setVolume] = useState(1);
  const [played, setPlayed] = useState(0);
  const [setting, setSetting] = useState(false);
  const [PlayBackSpeed, setPlaybackSpeed] = useState({
    Selectedspeed: "Normal",
    Speed: 1,
  });
  const speedMapping: {
    [key: string]: number;
  } = {
    "2x": 2,
    "1.5x": 1.5,
    Normal: 1,
    "0.75x": 0.75,
    "0.5x": 0.5,
  };
  const playingState = () => {
    setPlaying(false)
  }
  return (
    <div>
        <button type="button" className="relative h-[30rem] flex justify-center items-center " onClick={playingState}>
      <ReactPlayer
        ref={playerRef}
        
        controls={false}
        height={"100%"}
        width={"100%"}
        playing={playing}
        url={VideoLink}
        onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
        onSeek={setPlayedSeconds}
        onDuration={setDurationSeconds} // This is called when the player has the duration
        volume={volume}
        playbackRate={PlayBackSpeed.Speed}
      />
      <Controls
        playerRef={playerRef}
        playing={playing}
        setPlaying={setPlaying}
        playedSeconds={playedSeconds}
        duration={durationSeconds}
        volume={volume}
        setVolume={setVolume}
        speedMapping={speedMapping}
        setSetting={setSetting}
        setting={setting}
        PlayBackSpeed={PlayBackSpeed}
        setPlayBackSpeed={setPlaybackSpeed}
      />
      </button>
    </div>
  );
};

type ControlsProps = {
  playing: boolean;
  setting: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setSetting: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  playedSeconds: number;
  duration: number;
  playerRef: MutableRefObject<ReactPlayer>;
  volume: number;
  speedMapping: Object;
  PlayBackSpeed: { Selectedspeed: string; Speed: number };
  setPlayBackSpeed: Dispatch<
    SetStateAction<{ Selectedspeed: string; Speed: number }>
  >;
};

const Controls = (props: ControlsProps) => {
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.playerRef.current.seekTo(+e.target.value, "seconds");
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setVolume(parseFloat(e.target.value));
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

  useEffect(() => {
    handleTime();
  }, [props.playedSeconds]);

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
  }

  return (
    <ul className="absolute left-0 bottom-3 z-30 w-full">
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
      <li>
        <input
          type="range"
          value={props.playedSeconds}
          min="0"
          max={props.duration}
          onChange={seek}
        />
      </li>
      <li>
        <input
          type="range"
          value={props.volume}
          onChange={handleVolumeChange}
          min="0"
          max="1"
          step="0.1"
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
              ${key[0] == props.PlayBackSpeed.Selectedspeed && "bg-orange-600"}
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
      <button
        type="button"
        className="md:w-5 w-3"
        onClick={() => props.setSetting(!props.setting)}
      >
        <AiOutlineSetting size={25} />
      </button>
    </ul>
  );
};

export default Player;
