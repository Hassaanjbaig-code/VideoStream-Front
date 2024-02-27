import { useState } from "react";
import { EventHandlerButton } from "../../hooks/Button";
import { useAddSubscribeMutation } from "../../redux/FetchApi/VideoFetch/Video";
import LikeDisLike from "./LikeDisLike";

interface VideoIntro {
  title: string | undefined;
  image: string | undefined;
  name: string | undefined;
  view: string | number | undefined;
  Like: number | undefined;
  id: string | undefined;
}

const IntroVideo = ({ title, image, name, view, Like, id }: VideoIntro) => {
  const [addSubscribe, { isSuccess: SubscribeSuccess, data: SubscribeData }] =
    useAddSubscribeMutation();
    const [clickSubscribe, setCLickSubscribe] = useState(false)

    async function AddSubscribe(id: string | undefined) {
      if(id == undefined) return setCLickSubscribe(false)
      let data = await addSubscribe(id)
    console.log(data)
      if(SubscribeSuccess){
        if (SubscribeData?.status == 200) {
          setCLickSubscribe(true)
        } else {
          setCLickSubscribe(false)
        }
      } else {
        setCLickSubscribe(false)
        console.error("Issue in the subscribe")
      }
    }
  return (
    <>
      <h2 className="text-xl font-bold ">{title}</h2>
      <div className="my-6 flex md:items-center w-full justify-between max-md:flex-col max-md:gap-3">
        <div className="flex max-md:justify-between md:gap-3">
          <div className="flex gap-3 items-center">
            <img src={image} alt={name} className="w-14 h-14 rounded-full" />
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl">{name}</h3>
              <h5 className="text-gray-400 text-sm">{view} Subscribe</h5>
            </div>
          </div>
          <button
            type="button"
            name="Subscribe"
            onClick={() =>
              AddSubscribe(id)
            }
            // onClick={() => addSubecribe(String(data?.data.channel))}
            className={`md:w-36 w-24 h-16 text-black rounded-3xl md:text-xl text-sm hover:bg-red-500 ${
              clickSubscribe ? "bg-red-600" : "bg-white"
            }`}
          >
            Subscribe
          </button>
        </div>
        <LikeDisLike like={Like} key={id} id={id} />
      </div>
    </>
  );
};

export default IntroVideo;
