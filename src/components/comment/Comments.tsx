import React, { useState } from "react";
import { useAddCommentMutation } from "../../redux/FetchApi/VideoFetch/Video";
import { Comment } from "../../vite-env";

interface PropComments {
  totalComment: number | undefined;
  videoID: string | undefined;
}

const Comments = ({ totalComment, videoID }: PropComments) => {
  const [comments, setComments] = useState<string>("");
  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComments(e.target.value);
  };
  const [addComment, { isSuccess } ] = useAddCommentMutation();

  const Postcomment: Comment = {
    id: videoID,
    commentData: {
      comment: comments,
    },
  };
 

  async function comment() {
    try {
      await addComment(Postcomment);
      if(isSuccess){
        setComments("")
      }
    } catch (error) {
      console.log(error);
      // Handle any errors here
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key)
    if (e.key === "Enter") {
      // Post the comment if "Enter" is pressed and the comment has 100 or more characters
      comment();
    }
  };

  return (
    <div>
      <h3>{totalComment} Comments</h3>
      <div className="my-6 flex gap-3 items-center">
        <img
          src="https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj"
          height={40}
          alt="Default profile photo"
          className="shadow-xl w-12 h-12 rounded-full"
        />
        <input
          type="text"
          className="border-b-2 bg-transparent w-4/6 text-lg p-3 outline-none"
          placeholder="Add a comment"
          onChange={handleChangeComment}
          onKeyDown={handleKeyDown}
          value={comments}
        />
      </div>
    </div>
  );
};

export default Comments;
