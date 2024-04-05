import {
  validateDes,
  validateTitle,
  validImage,
  validateVideo,
} from "../../Validation/InputValidation";
import { useState } from "react";
import { useAddVideoMutation } from "../../redux/FetchApi/VideoFetch/Video";
import ReactLoading from "react-loading";
import Formcard from "./FormCard";
import { videoForm } from "../../vite-env";

const CreateCard = () => {
  const [addVideo, { isLoading }] = useAddVideoMutation();
  const [showError ,setShowError] = useState({
    error: false,
    mes: ""
  })

  const SubmitVideo = async (videoForm: videoForm) => {
    let errorCheck = validateTitle(videoForm.title)
    let DescriptionError = validateDes(videoForm.description)
    let VideoCheck = validateVideo(videoForm.video)
    let ImageCheck = validImage(videoForm.image)

    if (
      !errorCheck.isValid &&
      !DescriptionError.isValid &&
      !VideoCheck.isValid &&
      !ImageCheck.isValid
    ) {
      const formData = new FormData();
      formData.append("title", videoForm.title);
      formData.append("description", videoForm.description);

      if (videoForm.image !== null) {
        formData.append("image", videoForm.image);
      }

      if (videoForm.video !== null) {
        formData.append("video", videoForm.video);
      }
      // Dispatch the mutation with the created object

      const result = (await addVideo(formData)) as any | void;
      if (result.data.status === 200) {
        return true
      } else {
        setShowError({
          error: true,
          mes: result.data.message,
        });
        return false
      }
    } else {
      setShowError({
        error: true,
        mes: "Please Fill the Field correctly",
      });
      return false
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
      </div>
    );
  }
  return (
    <section
      className={`w-full md:h-[170vh] h-100% flex justify-center items-center ${
        isLoading && "cursor-progress"
      }`}
    >
      <div className="w-[25rem] md:w-[35rem] h-[85%] my-12 p-[11px 15px 14px 11px] bg-black md:rainbow flex flex-col shadow-lg rounded-xl">
        <h2 className="text-center my-3 font-bold text-6xl text-white">
          Add a Video
        </h2>
        {/* <form
          className="flex flex-col gap-7 my-20 items-center justify-center"
          onSubmit={SubmitVideo}
        >
          <Input
            name="title"
            type="text"
            label="Enter Title"
            placeholder="Enter the video Title"
            error={errorCheck}
            value={videoForm.title}
            handleForm={handleChangeForm}
            handleFocus={handleFocusVideo}
            handleBlur={handleBlurTitle}
            passwordChecker={false}
            divClassName="max-md:item-center"
            classeWraper=""
          />
          <TextArea
            placeholder="Enter Description"
            name="description"
            label="Description"
            error={DeserrorCheck}
            value={videoForm.description}
            handleForm={handleChangeTestForm}
            handleBlur={handleBlurDes}
            handleFocus={handleFocusVideoDes}
          />
          <div className="flex flex-col gap-2 relative md:w-[29rem] w-[95%] items-center">
            <label className="w-full">
              Add Image{" "}
              {ImageCheck.isValid && (
                <span className="text-red-500">{ImageCheck.err}</span>
              )}
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onBlur={handleImageBlue}
              onChange={handleChangeImageVideo}
              // onFocus={handleFocus}
              placeholder="Add a Image"
              className={`text-base text-stone-500 file:text-lg w-60
              file:mr-5 file:p-2 file:rounded-md file:px-3 file:border-none 
              file:font-medium file:bg-blue-500 hover:file:bg-blue-600 
              focus:file:bg-blue-800`}
            />
          </div>
          <div className="flex flex-col gap-2 relative md:w-[29rem] w-[95%] items-center">
            <label className="w-full">
              Add Video{" "}
              {VideoCheck.isValid && (
                <span className="text-red-500">{VideoCheck.err}</span>
              )}
            </label>
            <input
              name="video"
              type="file"
              accept="video/*"
              onBlur={handleVideoBlue}
              onChange={handleChangeImageVideo}
              // onFocus={handleFocus}
              placeholder="Add a Image"
              className={`text-base text-stone-500 file:text-lg w-60
              file:mr-5 file:p-2 file:rounded-md file:px-3 file:border-none
               file:font-medium file:bg-blue-500 hover:file:bg-blue-600
              focus:file:bg-blue-800`}
            />
          </div>
          {showError.error && (
            <p className="text-red-500 text-sm">{showError.mss}</p>
          )}
          <button
            type="submit"
            className="p-5 bg-blue-600 w-44 h-16 rounded-lg focus:ring-1 hover:bg-blue-800 hover:text-white/60"
          >
            Submit
          </button>
        </form> */}
        <Formcard
          showError={showError}
          handleSubmitForm={SubmitVideo}
          key={Math.random()}
        />
      </div>
    </section>
  );
};

export default CreateCard;
