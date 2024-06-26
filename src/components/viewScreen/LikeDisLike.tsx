import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import {
  useAddDisLikeMutation,
  useAddLikeMutation,
} from "../../redux/FetchApi/VideoFetch/Video";
import { DislikeClickButton, likeClickButton } from "../../hooks/Button";
import sound from "../../assets/sound/Like.mp3";
import SSound from "../../assets/sound/DisLike.mp3";
import { isLoggedIn } from "../input/Auth";

interface LikeDis {
  like: number | undefined;
  id: string | undefined;
  checkSignIn: () => boolean;
}

const LikeDisLike = ({ like, id, checkSignIn }: LikeDis) => {
  let [addLike] = useAddLikeMutation();
  const [addDisLike] = useAddDisLikeMutation();
  async function likeAvideo(id: string | undefined) {
    if (isLoggedIn.value) {
      if (id == undefined) return (likeClickButton.value = false);
      await addLike(id);
      // if ("data" in result && result.data.message === 200) {
      //   likeClickButton.value = true;
      // } else {
      //   likeClickButton.value = false;
      // }
      if (likeClickButton.value == false) new Audio(sound).play();
    } else {
      checkSignIn();
    }
  }

  async function DisLikeVideo(id: string | undefined) {
    if (isLoggedIn.value) {
      if (id == undefined) return (DislikeClickButton.value = false);
      await addDisLike(id);
      // if ("data" in result && result.data.message === 200) {
      //   DislikeClickButton.value = true;
      // } else {
      //   DislikeClickButton.value = false;
      // }
      if (DislikeClickButton.value == false) new Audio(SSound).play();
    } else {
      checkSignIn();
    }
  }
  return (
    <div className="flex gap-2">
      <button
        type="button"
        name="Like"
        className="w-24 h-14 bg-black/40 rounded-xl flex items-center justify-around"
        onClick={async () => await likeAvideo(id)}
      >
        <AiTwotoneLike
          size={likeClickButton.value ? 35 : 30}
          color={likeClickButton.value ? "#b03030ad" : "#fff"}
          style={{
            transition: "transform 0.3s ease", // Ensure only transform animates
            transform: `scale(${likeClickButton.value ? 1.15 : 1}, ${
              likeClickButton.value ? 1 : 1
            })`,
            height: "44px",
            innerWidth: "60px",
          }}
        />

        <span className="text-lg">{like}</span>
      </button>
      <button
        type="button"
        name="Dislike"
        className="w-[3rem] h-14 bg-black/40 rounded-xl flex items-center justify-around"
        onClick={async () => !likeClickButton.value && (await DisLikeVideo(id))}
      >
        <AiTwotoneDislike
          size={DislikeClickButton.value ? 35 : 30}
          color={DislikeClickButton.value ? "#b03030ad" : "#fff"}
        />
      </button>
    </div>
  );
};

export default LikeDisLike;
