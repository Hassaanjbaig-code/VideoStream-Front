import React, { useEffect } from "react";
import Input from "../input/Input";
import TextArea from "../input/textArea";
import { useCreateChannelMutation } from "../../redux/FetchApi/channel/Channel";
import { useNavigate } from "react-router-dom";
import { signUpStore } from "../../hooks/auth";
import { user } from "../input/Auth";
import {
  validateDes,
  validateName,
  validImage,
} from "../../Validation/InputValidation";
import FormCreateChannel from "./FormCreateChannel";

interface errorMessage {
  status: number;
  data: {
    status: number;
    message: string;
  };
}

interface FormSubmit {
  name: string;
  description: string;
  image: File | null;
}
const CreateChannel = () => {
  const [createChannel, { isError, isSuccess, error, data }] =
    useCreateChannelMutation();

  let navigation = useNavigate();
  const errorProps = error as errorMessage | undefined;
  // const [channelForm, setChannelForm] = useState({
  //   name: "",
  //   description: "",
  //   image: null,
  // });
  // const [NameEror, setnameError] = useState({
  //   isValid: false,
  //   err: "",
  // });
  // const [DeserrorCheck, setDesErrorCheck] = useState({
  //   isValid: false,
  //   err: "",
  // });
  // const [ImgerrorCheck, setImgErrorCheck] = useState({
  //   isValid: false,
  //   err: "",
  // });
  // const handleChangeTestForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setChannelForm({
  //     ...channelForm,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setChannelForm({
  //     ...channelForm,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleBlurName = () => {
  //   const errorName = validateName(channelForm.name);
  //   setnameError({
  //     ...NameEror,
  //     isValid: errorName.isValid,
  //     err: errorName.err,
  //   });
  // };
  // const handleBlurImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]; // Use optional chaining

  //   if (file) {
  //     const validate = validImage(file);
  //     setImgErrorCheck({
  //       ...ImgerrorCheck,
  //       ...validate,
  //     });
  //   }
  // };

  // const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setChannelForm({
  //     ...channelForm,
  //     [e.target.name]: e.target.files?.[0] || null,
  //   });
  // };

  // const handleBlurDes = () => {
  //   const validate = validateDes(channelForm.description);
  //   setDesErrorCheck({
  //     ...DeserrorCheck,
  //     ...validate,
  //   });
  // };
  // const handleFocus = () => {
  //   setnameError({
  //     isValid: false,
  //     err: "",
  //   });
  // };
  // const handleFocusVideoDes = () => {
  //   setDesErrorCheck({
  //     isValid: false,
  //     err: "",
  //   });
  // };
  const handleSubmit = async ( channelForm: {name: string, description: string, image: File | null }) => {
    let NameError = validateName(channelForm.name);
    let DeserrorCheck = validateDes(channelForm.description);
    let ImgerrorCheck = validImage(channelForm.image);

    if (
      !NameError.isValid &&
      !DeserrorCheck.isValid &&
      !ImgerrorCheck.isValid
    ) {
      const formData = new FormData();
      formData.append("name", channelForm.name);
      formData.append("description", channelForm.description);

      if (channelForm.image !== null) {
        formData.append("file", channelForm.image);
      }
      (await createChannel(formData)) as any | void;
      return true;
    } else {
      alert("Please Fill the Form");
      return false;
    }
  };

  useEffect(() => {
    resultSubmit();
  }, [isSuccess]);

  const resultSubmit = React.useCallback(() => {
    if (isSuccess) {
      if (data?.status == 200) {
        if (data?.verify) {
          let store = { token: data?.token, channel: data?.channel };
          signUpStore(store);
          if (data?.channel.status == 404) {
            navigation("/");
          } else {
            user.value = store;
            navigation("/");
          }
        }
      }

      return true;
    } else {
      return false;
    }
  }, [isSuccess]);

  return (
    <section className="w-full h-[140vh] flex justify-center items-center">
      <div className="md:w-[35rem] w-[95%] bg-black rainbow flex flex-col shadow-lg rounded-xl">
        <h2 className="text-center p-4 my-2 font-bold text-6xl text-white">
          Create a Channel
        </h2>
        {/* <form
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
          {isError && (
            <p className="text-red-400">{errorProps?.data.message}</p>
          )}
          <button
            className="p-5 bg-blue-600 w-44 h-16 rounded-lg focus:ring-1 hover:bg-blue-800 hover:text-white/60"
            type="submit"
          >
            Submit
          </button>
        </form> */}
        <FormCreateChannel
          FormSubmit={handleSubmit}
          isError={isError}
          error={errorProps?.data.message}
          key={Math.random()}
        />
      </div>
    </section>
  );
};

export default CreateChannel;
