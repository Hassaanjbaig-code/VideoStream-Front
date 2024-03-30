import React, { useState } from "react";
import {
  validationEmail,
  validatePassword,
} from "./../../Validation/InputValidation";
import Input from "../input/Input";
import ReactLoading from "react-loading";
import { SignInError } from "../../vite-env";

interface SignInFormProp {
  isLoading: boolean;
  showError: string | undefined;
  error: SignInError | undefined;
  handleSubmitForm: (form: {
    email: string;
    password: string;
  }) => Promise<boolean | undefined>;
  isError: boolean;
}
const SignInForm: React.FC<SignInFormProp> = ({
  isLoading,
  showError,
  handleSubmitForm,
  isError,
  error,
}: SignInFormProp) => {
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [emailError, setError] = useState({
    isValid: false,
    err: "",
  });

  const handleFocus = () => {
    setError({
      isValid: false,
      err: "",
    });
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  let PasswordShow = "password";
  const handlePasswordDisplay = () => {
    setPasswordDisplay(!passwordDisplay);
  };
  if (passwordDisplay === true) {
    PasswordShow = "text";
  } else {
    PasswordShow = "password";
  }

  const handleBlurEmail = () => {
    const getError = validationEmail(form.email);
    setError({
      ...emailError,
      isValid: getError.isValid,
      err: getError.err,
    });
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = await handleSubmitForm({
      email: form.email,
      password: form.password,
    });

    if (data == true) {
      setForm({
        email: "",
        password: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSignInSubmit}
      className="flex flex-col gap-7 my-20 items-center justify-center"
    >
      <Input
        name="email"
        label="Email"
        type="email"
        passwordChecker={false}
        value={form.email}
        classeWraper={null}
        handleBlur={handleBlurEmail}
        handleForm={handleFormChange}
        divClassName={null}
        error={emailError}
        placeholder={"Enter Email"}
        handleFocus={handleFocus}
      />
      <Input
        name="password"
        label="Password"
        type={PasswordShow}
        value={form.password}
        passwordChecker={true}
        password={passwordDisplay}
        error={undefined}
        handleForm={handleFormChange}
        handleBlur={undefined}
        handleFocus={undefined}
        handlePasswordDisplay={handlePasswordDisplay}
        placeholder="Enter your password"
        classeWraper={null}
        divClassName=""
      />

      {isLoading && (
        <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
      )}

      {isError && (
        <h2 className="text-xl text-red-500">
          {error?.data?.msg || showError}
        </h2>
      )}
      <button
        type="submit"
        className="bg-white text-black/60 w-32 h-16 text-2xl border-2 hover:border-blue-400 rounded-2xl hover:transition-shadow delay-75 duration-100"
        disabled={isLoading}
      >
        Log In
      </button>
    </form>
  );
};

export default SignInForm;
