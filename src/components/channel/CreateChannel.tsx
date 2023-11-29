import React, { useState } from "react";
import {
  validateDes,
  validateName,
  validImage,
} from "../../Validation/InputValidation";
import Input from "../input/Input";
import TextArea from "../input/textArea";
import { useCreateChannelMutation } from "../../redux/FetchApi/channel/Channel";
import { useNavigate } from "react-router-dom";
// import { handleCreateChannel } from "../../vite-env";

const CreateChannel = () => {
  const [createChannel, { isError, isSuccess }] = useCreateChannelMutation();

  const Navigate = useNavigate();
  const [channelForm, setChannelForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [NameEror, setnameError] = useState({
    isValid: false,
    err: "",
  });
  const [DeserrorCheck, setDesErrorCheck] = useState({
    isValid: false,
    err: "",
  });
  const [ImgerrorCheck, setImgErrorCheck] = useState({
    isValid: false,
    err: "",
  });
  const handleChangeTestForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChannelForm({
      ...channelForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelForm({
      ...channelForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlurName = () => {
    const errorName = validateName(channelForm.name);
    setnameError({
      ...NameEror,
      isValid: errorName.isValid,
      err: errorName.err,
    });
  };
  const handleBlurImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining

    if (file) {
      const validate = validImage(file);
      setImgErrorCheck({
        ...ImgerrorCheck,
        ...validate,
      });
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelForm({
      ...channelForm,
      [e.target.name]: e.target.files?.[0] || null,
    });
  };

  const handleBlurDes = () => {
    const validate = validateDes(channelForm.description);
    setDesErrorCheck({
      ...DeserrorCheck,
      ...validate,
    });
  };
  const handleFocus = () => {
    setnameError({
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!NameEror.isValid && !DeserrorCheck.isValid && !ImgerrorCheck.isValid) {
      const formData = new FormData();
      formData.append("name", channelForm.name);
      formData.append("description", channelForm.description);

      if (channelForm.image !== null) {
        formData.append("file", channelForm.image);
      }
      const result = (await createChannel(formData)) as any | void;
      if (isSuccess) {
        setChannelForm({
          name: "",
          description: "",
          image: null,
        });
        Navigate("/");
      } else {
        setError(result.error.data.message);
      }
    } else {
      alert("Please Fill the Form");
    }
  };
  return (
    <section className="w-full h-[120vh] flex justify-center items-center">
      <div className="md:w-[35rem] w-[95%] bg-black rainbow flex flex-col shadow-lg rounded-xl">
        <h2 className="text-center p-4 my-2 font-bold text-6xl text-white">
          Create a Channel
        </h2>
        <form
          className="flex flex-col gap-7 my-12 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <Input
            name="name"
            label="Name"
            type="text"
            value={channelForm.name}
            error={NameEror}
            passwordChecker={false}
            handleForm={handleFormChange}
            handleBlur={handleBlurName}
            handleFocus={handleFocus}
            placeholder="Enter your name"
          />
          <div className="flex flex-col gap-2 relative md:w-[29rem] w-full">
            <label className="w-full">
              Add Cover Image{" "}
              {ImgerrorCheck.isValid && (
                <span className="text-red-500">{ImgerrorCheck.err}</span>
              )}
            </label>
            <input
              name="image"
              type="file"
              onBlur={handleBlurImage}
              onChange={handleImage}
              // onFocus={handleFocus}
              placeholder="Add a Cover Image"
              className={`bg-white/50 focus:bg-white h-16 text-lg rounded-lg p-5 focus:ring text-black`}
            />
          </div>
          <TextArea
            placeholder="Enter Description"
            name="description"
            label="Description"
            error={DeserrorCheck}
            value={channelForm.description}
            handleForm={handleChangeTestForm}
            handleBlur={handleFocusVideoDes}
            handleFocus={handleBlurDes}
          />
          {isError && <p className="text-red-400">{error}</p>}
          <button
            className="p-5 bg-blue-600 w-44 h-16 rounded-lg focus:ring-1 hover:bg-blue-800 hover:text-white/60"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateChannel;
