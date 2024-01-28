import {
  validateDes,
  validateTitle,
  validImage,
  validateVideo,
} from "../../Validation/InputValidation";
import Input from "../input/Input";
import React, { useState } from "react";
import TextArea from "../input/textArea";
import { useAddVideoMutation } from "../../redux/FetchApi/VideoFetch/Video";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

const CreateCard = () => {
  const [addVideo, { isLoading, error }] = useAddVideoMutation();
  const Navigate = useNavigate();
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    image: null,
    video: null,
  });
  const [errorCheck, setErrorCheck] = useState({
    isValid: false,
    err: "",
  });
  const [DeserrorCheck, setDesErrorCheck] = useState({
    isValid: false,
    err: "",
  });
  const [ImageCheck, setImgErrorCheck] = useState({
    isValid: false,
    err: "",
  });
  const [VideoCheck, setVidErrorCheck] = useState({
    isValid: false,
    err: "",
  });
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoForm({
      ...videoForm,
      [e.target.name]: e.target.value,
    });
  };

  const [showError, setShowError] = useState({
    error: false,
    mss: ""
  })

  const handleChangeImageVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files?.[0] || null)
    // console.log(e.target.name)
    setVideoForm({
      ...videoForm,
      [e.target.name]: e.target.files?.[0] || null,
    });
  };

  const handleChangeTestForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoForm({
      ...videoForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlurTitle = () => {
    const validate = validateTitle(videoForm.title);
    setErrorCheck({
      ...DeserrorCheck,
      isValid: validate.isValid,
      err: validate.err,
    });
  };
  const handleBlurDes = () => {
    const validate = validateDes(videoForm.description);
    setDesErrorCheck({
      ...DeserrorCheck,
      ...validate,
    });
  };
  const handleFocusVideo = () => {
    setErrorCheck({
      isValid: false,
      err: "",
    });
  };
  const handleFocusVideoDes = () => {
    setDesErrorCheck({
      isValid: false,
      err: "",
    });
  };

  const handleImageBlue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining

    if (file) {
      const validate = validImage(file);
      setImgErrorCheck({
        ...ImageCheck,
        ...validate,
      });
    }
  };
  const handleVideoBlue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining

    if (file) {
      const validate = validateVideo(file);
      setVidErrorCheck({
        ...VideoCheck,
        ...validate,
      });
    }
  };

  const SubmitVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !errorCheck.isValid &&
      !DeserrorCheck.isValid &&
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
      console.log(result)
      if (result.data.status === 200) {
        setVideoForm({
          title: "",
          description: "",
          image: null,
          video: null,
        });
        Navigate("/");
      } else {
        setShowError({
          error: true,
          mss: result.data.message
        })
        console.log(result);
        // handleError(result.error.data.message, result.status)
      }
    } else {
      setShowError({
        error: true,
        mss: "Please Fill the Field correctly"
      })
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <AiOutlineLoading style={{ transform: 'rotate(90deg)' }} size={30} />
      </div>
    );
  }
  return (
    <section className="w-full h-[150vh] flex justify-center items-center">
      <div className="w-[35rem] bg-black rainbow flex flex-col shadow-lg rounded-xl">
        <h2 className="text-center my-3 font-bold text-6xl text-white">
          Add a Video
        </h2>
        <form
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
          <div className="flex flex-col gap-2 relative md:w-[29rem] w-full">
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
              className={`bg-white/50 focus:bg-white h-16 text-lg rounded-lg p-5 focus:ring text-black`}
            />
          </div>
          <div className="flex flex-col gap-2 relative md:w-[29rem] w-full">
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
              className={`bg-white/50 focus:bg-white h-16 text-lg rounded-lg p-5 focus:ring text-black`}
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
        </form>
      </div>
    </section>
  );
};

export default CreateCard;
