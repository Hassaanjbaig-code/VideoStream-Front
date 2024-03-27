import {
  useState,
  useRef,
  MutableRefObject,
} from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import "./Video.css"
import Controls from "./Controls";

interface Video2 {
  VideoLink: string | undefined;
}

const Player = ({ VideoLink }: Video2) => {
  const [playing, setPlaying] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const playerContainer = useRef() as MutableRefObject<HTMLButtonElement>;
  const [volume, setVolume] = useState({
    speed: 1,
    open: false,
  });
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
    setPlaying(!playing);
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainer.current);
  };
  return (
    <div>
      <button
        type="button"
        className="relative h-[30rem] flex justify-center items-center "
        onClick={playingState}
        ref={playerContainer}
      >
        <ReactPlayer
          ref={playerRef}
          controls={false}
          height={"100%"}
          width={"100%"}
          playing={playing}
          url={VideoLink}
          onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
          onSeek={setPlayedSeconds}
          onDuration={setDurationSeconds}
          volume={volume.speed}
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
          toggleFullScreen={toggleFullScreen}
        />
      </button>
    </div>
  );
};

export default Player;
