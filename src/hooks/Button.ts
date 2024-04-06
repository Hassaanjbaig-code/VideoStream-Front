import { signal } from "@preact/signals-react";
import { tokenImport, videoType } from "../vite-env";
import { isLoggedIn } from "../components/input/Auth";

export let buttonValue = signal<String | undefined>("");
export let likeClickButton = signal(false);
export let DislikeClickButton = signal(false);
export let SubscribeClickButton = signal(false);

const token: tokenImport = JSON.parse(
  localStorage.getItem("User Detail") || "{}"
);

export function Check(data: videoType | undefined) {
  if (isLoggedIn.value) {
    let like = data?.Like.filter(
      (data) => data.channel == token.channel.message
    );
    let disLike = data?.DisLike.filter(
      (data) => data.channel == token.channel.message
    );
    let subscribeCheck = data?.subscribe.filter(
      (data) => data.subScribeChannel == token.channel.message
    );
    if (like?.length == 1) {
      likeClickButton.value = true;
    } else {
      likeClickButton.value = false;
    }
    if (disLike?.length == 1) {
      DislikeClickButton.value = true;
    } else {
      DislikeClickButton.value = false;
    }
    if (subscribeCheck?.length == 1) {
      SubscribeClickButton.value = true;
    } else {
      SubscribeClickButton.value = false;
    }
  }
}

// interface EventHandlerButtonType {
//   name: string | undefined;
//   id: string | undefined;
// }

// export function EventHandlerButton({ name, id }: EventHandlerButtonType): any {
//   switch (name) {
//     case "Like":
//       Like(id);
//       break;
//     case "Subscribe":
//       Subscribe();
//       break;
//     case "Dislike":
//       Dislike();
//       break;
//     default:
//       break;
//   }
// }

// function Like(id: string | undefined) {
//   const [addLike] =
//     useAddLikeMutation();

//     if(id == undefined) return false
//     handleLike(id)

//   async function handleLike(id: string) {
//     if (id == undefined) return false;

//     // Call the hook within the functional component
//     let result = await addLike(id);

//     console.log(result)
//   }
// }

// function Subscribe() {
//   console.log("Function of Subscribe");
// }
// function Dislike() {
//   console.log("Function of Dislike");
// }
