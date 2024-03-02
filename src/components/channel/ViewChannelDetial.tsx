import React, { useState } from "react";
import { useChannelInfoQuery } from "../../redux/FetchApi/channel/Channel";
// import ButtonChannel from "./ButtonChannel";
import CardChannel from "./CardChannel";
import { ChannelDetail } from "./ChannelDetail";
import SignAnothe from "./SignAnothe";
import SwitchAccount from "./SwitchAccount";
import ReactLoading from "react-loading";

interface ButtonOption {
  AddNew: boolean;
  SwitchAccount: boolean;
}
const ViewChannelDetial = () => {
  let { data, isLoading } = useChannelInfoQuery();
  const [buttonOption, setButtonOption] = useState<ButtonOption>({
    AddNew: false,
    SwitchAccount: false,
  });
  // console.log(data);
  function addAccount(e: React.ChangeEvent<HTMLButtonElement>) {
    console.log(e.target.name);

    setButtonOption({
      ...buttonOption,
      [e.target.name as keyof typeof buttonOption]:
        !buttonOption[e.target.name as keyof typeof buttonOption],
    });
    // console.log("This is add new", ButtonOption.value);
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
      </div>
    );
  }
  return (
    <section className="min-h-screen h-full">
      <ChannelDetail
        channel={data?.data.channel}
        subscribe={data?.data.subscribe}
      />
      {/* <ButtonChannel button={addAccount} /> */}
      <div className="flex flex-col my-4 gap-2">
        <h4 className="text-3xl font-semibold font-mono">Library</h4>
        <ul className="flex gap-2 overflow-x-auto my-2 mx-1">
          {data?.data.video.map((data, index) => (
            <CardChannel Video={data} key={index} />
          ))}
        </ul>
      </div>
      {buttonOption.AddNew && (
        <div
          className={`absolute top-0 left-0 z-50 min-h-full h-screen w-full bg-black/90 flex justify-center items-center`}
        >
          <SignAnothe close={addAccount} />
        </div>
      )}
      {buttonOption.SwitchAccount && (
        <div
          className={`absolute top-0 left-0 z-50 min-h-full h-screen w-full bg-black/90 flex justify-center items-center`}
        >
          <SwitchAccount close={addAccount} />
        </div>
      )}
    </section>
  );
};

export default ViewChannelDetial;
