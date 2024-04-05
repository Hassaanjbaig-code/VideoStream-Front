import React, { useState } from "react";
import TextArea from "../input/textArea";
import Input from "../input/Input";
import { validImage, validateDes, validateTitle, validateVideo } from "../../Validation/InputValidation";
import { FormSubmit } from "../../vite-env";
import { useNavigate } from "react-router-dom";

const Formcard = (props: FormSubmit) => {
  const {showError, handleSubmitForm} = props;
  let Navigation = useNavigate()
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

  const handleChangeImageVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    let data = await handleSubmitForm(videoForm)
    if(data == true){
        setVideoForm({
            title: "",
            description: "",
            image: null,
            video: null
        })
        Navigation("/")
    }
  }

  return (
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
        <p className="text-red-500 text-sm">{showError.mes}</p>
      )}
      <button
        type="submit"
        className="p-5 bg-blue-600 w-44 h-16 rounded-lg focus:ring-1 hover:bg-blue-800 hover:text-white/60"
      >
        Submit
      </button>
    </form>
  );
};

export default Formcard;
