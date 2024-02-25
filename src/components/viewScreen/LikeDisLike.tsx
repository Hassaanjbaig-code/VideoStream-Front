import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { EventHandlerButton } from "../../hooks/Button";

interface LikeDis {
  like: string | number | undefined
}

const LikeDisLike = ({ like }: LikeDis) => {
    let clickLike = false
    let clickDisLike = false
  return (
    <div className="flex gap-2">
      <button
        type="button"
        name="Like"
        className="w-24 h-14 bg-black/40 rounded-xl flex items-center justify-around"
        onClick={e => EventHandlerButton(e.currentTarget.name)}
      >
        <AiTwotoneLike size={30} color={clickLike ? "#b03030ad" : "#fff"} />
        <span className="text-lg">{like}</span>
      </button>
      <button
        type="button"
        name="Dislike"
        className="w-[3rem] h-14 bg-black/40 rounded-xl flex items-center justify-around"
        onClick={(e) => !clickLike && EventHandlerButton(e.currentTarget.name)}
      >
        <AiTwotoneDislike
          size={30}
          color={clickDisLike ? "#b03030ad" : "#fff"}
        />
      </button>
      {/* <button
                type="button"
                className="w-28 h-14 bg-black/40 rounded-xl flex items-center justify-around"
                onClick={() => setShare(!clickShare)}
              >
                <PiShareFatFill size={30} />
                Share
              </button> */}
    </div>
  );
};

export default LikeDisLike;
