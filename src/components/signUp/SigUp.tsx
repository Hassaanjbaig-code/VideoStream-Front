import { useState, useEffect, useCallback } from "react";
import { useRegisterMutation } from "../../redux/FetchApi/SignUp/SignUp";
import { ResendError, SignUpRequest } from "../../vite-env";
import Alert2 from "../alert/Alert2";
import Form from "./Form";
import {
  validateName,
  validationEmail,
  validatePassword,
} from "../../Validation/InputValidation";

export const SigUp = () => {
  const [openALert, setOpenAlert] = useState({
    show: false,
    msg: "",
  });
  const [register, { isError, error: SignUpError, isSuccess, isLoading }] =
    useRegisterMutation();

  const handleSignUp = async (form: {
    name: string;
    email: string;
    password: string;
  }) => {
    const nameError = validateName(form.name);
    const emailError = validationEmail(form.email);
    const passwordError = validatePassword(form.password);

    if (!nameError.isValid && !emailError.isValid && !passwordError.isValid) {
      const signUp: SignUpRequest = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      let result = await register(signUp);
      return true;
    } else {
      setOpenAlert({
        show: true,
        msg: "Please fill the form correctly",
      });
      return false;
    }
  };
  const CheckAccount = useCallback(() => {
    if (isSuccess) {
      setOpenAlert({
        show: true,
        msg: "Please verify your email by checking the spam",
      });
      // }
    }
  }, [isSuccess]);

  useEffect(() => {
    CheckAccount();
  }, [isSuccess, CheckAccount]);

  function CloseAlert() {
    setOpenAlert({
      show: false,
      msg: "",
    });
  }

  return (
    <>
      <section className="w-full md:h-[140vh] h-screen flex justify-center items-center">
        <div className="md:w-[35rem] w-[92%] bg-black rainbow flex flex-col">
          <h2 className="text-center my-3 font-bold text-6xl text-white">
            Sign Up
          </h2>

          <Form
            key={Math.random()}
            isError={isError}
            error={(SignUpError as ResendError).data?.msg}
            FormSubmit={handleSignUp}
            loading={isLoading}
          />
        </div>
        {openALert.show && (
          <Alert2
            msg={openALert.msg}
            close={CloseAlert}
            buttonCalled={"Close"}
          />
        )}
      </section>
    </>
  );
};
