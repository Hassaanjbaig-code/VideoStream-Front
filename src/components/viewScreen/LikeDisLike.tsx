import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import {
  useAddDisLikeMutation,
  useAddLikeMutation,
} from "../../redux/FetchApi/VideoFetch/Video";
import { useState } from "react";
import { DislikeClickButton, likeClickButton } from "../../hooks/Button";

interface LikeDis {
  like: number | undefined;
  id: string | undefined;
}

const LikeDisLike = ({ like, id }: LikeDis) => {

  let [addLike ] =
    useAddLikeMutation();
  const [addDisLike ] =
    useAddDisLikeMutation();
  async function likeAvideo(id: string | undefined) {
    if (id == undefined) return likeClickButton.value = false;
    await addLike(id);
    // console.log(LikeData)
    // console.log(Likesuccess)
    // if (Likesuccess) {
    //   if (LikeData?.message == 250) {
    //     setClickLike(true);
    //     likeClickButton.value = true
    //   } else {
    //     setClickLike(false);
    //     likeClickButton.value = false
    //   }
    // } else {
    //   console.error("Not updated");
    //   likeClickButton.value = false
    //   setClickLike(false);
    // }
  }
  async function DisLikeVideo(id: string | undefined) {
    if (id == undefined) return DislikeClickButton.value = false;
    await addDisLike(id);
    // if (DisLikeData?.status !== 500) {
    //   if (DisLikeData?.message == 250) {  
    //     setClickDisLike(!clickDisLike);
    //     DislikeClickButton.value = true
    //   } else {
    //     setClickDisLike(!clickDisLike);
    //     DislikeClickButton.value = false
    //   }
    // } else {
    //   console.error("Not updated");
    //   DislikeClickButton.value = false
    //   setClickDisLike(false);
    // }
  }
  return (
    <div className="flex gap-2">
      <button
        type="button"
        name="Like"
        className="w-24 h-14 bg-black/40 rounded-xl flex items-center justify-around"
        onClick={() => likeAvideo(id)}
      >
        <AiTwotoneLike size={30} color={likeClickButton.value ? "#b03030ad" : "#fff"} />
        <span className="text-lg">{like}</span>
      </button>
      <button
        type="button"
        name="Dislike"
        className="w-[3rem] h-14 bg-black/40 rounded-xl flex items-center justify-around"
        onClick={() => !likeClickButton.value && DisLikeVideo(id)}
      >
        <AiTwotoneDislike
          size={30}
          color={DislikeClickButton.value ? "#b03030ad" : "#fff"}
        />
      </button>
    </div>
  );
};

export default LikeDisLike;
