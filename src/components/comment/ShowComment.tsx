// import { useState, useEffect } from "react";
import React, { useState } from "react";
import {
  useAddDisLikeCommentMutation,
  useAddLikeCommentMutation,
  useDeleteComentMutation,
  useShowCommentQuery,
} from "../../redux/FetchApi/VideoFetch/Video";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import ReactLoading from "react-loading"

interface tokenImport {
  token: string;
  channel: string;
}

interface ShowComment {
  id: string | undefined;
}

const ShowComment = ({ id }: ShowComment) => {
  const [commentEdit, setCommentEdit] = useState(false);
  const [addLikeComment] = useAddLikeCommentMutation();
  const [addDisLikeComment] = useAddDisLikeCommentMutation();

  const { data: commentData, isLoading: commentDataLoading } =
    useShowCommentQuery(String(id));
  const [deleteComent, response] = useDeleteComentMutation();

  const token: tokenImport = JSON.parse(
    localStorage.getItem("User Detail") || "{}"
  );

  if (commentDataLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
      </div>
    );
  }
  const AddLikeComment: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    const commentID = event.currentTarget.dataset.commentId;
    // console.log("DataSet Comment ID", commentID); // Retrieve commentID from the data attribute
    if (commentID) {
      const response = await addLikeComment(String(commentID));
      if ("data" in response) {
        if (response.data.status == 200 || 201) {
        }
      }
    }
  };

  const AddDisLIkeComment: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    const commentID = e.currentTarget.dataset.commentId;
    if (commentID) {
      const response = await addDisLikeComment(String(commentID));
      if ("data" in response) {
        if (response.data.status == 200 || 201) {
          console.log(response.data.message);
        }
      }
    }
  };

  if (response.isLoading)
    <div>
      <ReactLoading color="#fff" type="bars" />
    </div>;

  let buttonComment = ["Delete"];
  return (
    <ul className="my-6">
      {commentData?.video.comments.map((result, index) => (
        <li key={index}>
          <div className="flex gap-4 items-center">
            <div>
              <img
                src={result.channel.image}
                alt={result.channel.name}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex justify-between">
                <h2 className="text-xl text-gray-500 font-semibold">
                  {result.channel.name}
                </h2>
                {result.channel._id == token.channel && (
                  <button
                    type="button"
                    onClick={() => setCommentEdit(!commentEdit)}
                  >
                    <CiMenuKebab />
                  </button>
                )}
              </div>
              {commentEdit && (
                <ul className="flex flex-row-reverse relative">
                  <li className="w-56 h-24 flex items-center justify-center z-50 absolute flex-col bg-[#272712] top-[-129px]">
                    {buttonComment.map((data, index) => (
                      <button
                        key={index}
                        type="button"
                        className="text-2xl border-y-2 p-3 w-full bg-[#272727] hover:bg-[#212112] border-gray-800 text-gray-300"
                        onClick={() => deleteComent(String(result._id))}
                      >
                        {data}
                      </button>
                    ))}
                  </li>
                </ul>
              )}
              <p className="text-md text-white">{result.Comment}</p>
              {/* <div className="flex gap-6 items-center my-2">
                <button
                  type="button"
                  onClick={(e) => AddLikeComment(e)}
                  data-comment-id={result._id}
                >
                  <FiThumbsUp size={30} />
                </button>
                <button
                  type="button"
                  onClick={(e) => AddDisLIkeComment(e)}
                  data-comment-id={result._id}
                >
                  <FiThumbsDown size={30} />
                </button>
              </div> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ShowComment;
