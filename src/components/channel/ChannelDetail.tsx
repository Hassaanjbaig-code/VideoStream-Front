import { channel } from "../../vite-env";

export const ChannelDetail = ({ channel, subscribe }: { channel: channel | undefined, subscribe: number | undefined }) => {
  return (
    <div className="flex gap-3 items-center mx-4 my-4">
      <img
        src={channel?.image}
        alt={channel?.name}
        className="rounded-full w-28 h-28"
      />
      <div className="gap-1 flex flex-col">
        <h2>{channel?.name}</h2>
        <p>{channel?.description}</p>
        <p className="gap-2">
          <span className="text-gray-500">Subscribe:</span>
          {subscribe}
        </p>
      </div>
    </div>
  );
};
