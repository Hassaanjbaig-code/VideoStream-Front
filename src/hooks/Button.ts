import { signal } from "@preact/signals-react";
import { useAddLikeMutation } from "../redux/FetchApi/VideoFetch/Video";
import Like from "../customFunction/Like";

export let buttonValue = signal<String | undefined>("");
export let likeClickButton = signal(false)
export let DislikeClickButton = signal(false)
export let SubscribeClickButton = signal(false)


function Check(data) {
  
}

interface EventHandlerButtonType {
  name: string | undefined;
  id: string | undefined;
}

export function EventHandlerButton({ name, id }: EventHandlerButtonType): any {
  switch (name) {
    case "Like":
      Like(id);
      break;
    case "Subscribe":
      Subscribe();
      break;
    case "Dislike":
      Dislike();
      break;
    default:
      break;
  }
}

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

function Subscribe() {
  console.log("Function of Subscribe");
}
function Dislike() {
  console.log("Function of Dislike");
}
