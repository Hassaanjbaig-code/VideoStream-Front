import React, { useEffect } from "react";
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

const CreateChannel = () => {
  const [createChannel, { isError, isSuccess, error, data }] =
    useCreateChannelMutation();

  let navigation = useNavigate();
  const errorProps = error as errorMessage | undefined;
  const handleSubmit = async (channelForm: {
    name: string;
    description: string;
    image: File | null;
  }) => {
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
        // if (data?.verify) {
        let store = { token: data?.token, channel: data?.channel };
        signUpStore(store);
        navigation("/");
        // if (data?.channel.status == 404) {
        // } else {
        // user.value = store;
        // navigation("/");
        // }
        return true;
      }
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
