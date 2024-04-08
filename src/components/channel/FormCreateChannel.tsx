import React, { useState } from "react";
import TextArea from "../input/textArea";
import Input from "../input/Input";
import {
  validateDes,
  validateName,
  validImage,
} from "../../Validation/InputValidation";
import ReactLoading from "react-loading";

interface FormCreate {
  isError: boolean;
  error: string | undefined;
  FormSubmit: (channelForm: {
    name: string;
    description: string;
    image: File | null;
  }) => Promise<boolean | undefined>;
  isLoading: boolean
}

const FormCreateChannel = (props: FormCreate) => {
  const { isError, error, FormSubmit, isLoading } = props;
  const [NameError, setnameError] = useState({
    isValid: false,
    err: "",
  });
  const [channelForm, setChannelForm] = useState({
    name: "",
    description: "",
    image: null,
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
      ...NameError,
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
    let data = FormSubmit({
        name: channelForm.name,
        description: channelForm.description,
        image: channelForm.image
    })
    if ((await data) === true) {
      setChannelForm({
        name: "",
        description: "",
        image: null,
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-7 my-12 items-center justify-center"
      onSubmit={handleSubmit}
    >
      <Input
        name="name"
        label="Name"
        type="text"
        value={channelForm.name}
        error={NameError}
        passwordChecker={false}
        handleForm={handleFormChange}
        handleBlur={handleBlurName}
        handleFocus={handleFocus}
        placeholder="Enter your name"
        classeWraper={null}
        divClassName={null}
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
          accept="image/*"
          onBlur={handleBlurImage}
          onChange={handleImage}
          // onFocus={handleFocus}
          placeholder="Add a Cover Image"
          className={`text-base text-stone-500 file:text-lg w-60
              file:mr-5 file:p-2 file:rounded-md file:px-3 file:border-none
               file:font-medium file:bg-blue-500 hover:file:bg-blue-600
              focus:file:bg-blue-800`}
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
      {isLoading && (
        <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
      )}
      <button
        className="p-5 bg-blue-600 w-44 h-16 rounded-lg focus:ring-1 hover:bg-blue-800 hover:text-white/60"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default FormCreateChannel;
