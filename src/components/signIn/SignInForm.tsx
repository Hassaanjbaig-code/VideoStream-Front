import React, { useState } from "react";
import {
  validationEmail,
  validatePassword,
} from "./../../Validation/InputValidation";
import Input from "../input/Input";

interface SignInFormProp {
  form: {
    email: string;
    password: string
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SignInForm = ({ form, handleFormChange }: SignInFormProp) => {
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [emailError, setError] = useState({
    isValid: false,
    err: "",
  });
  const [passwError, setPasswordError] = useState({
    isValid: false,
    err: "",
  });

  const handleFocus = () => {
    setPasswordError({
      isValid: false,
      err: "",
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

  const handleBlurPassword = () => {
    const errorInPassword = validatePassword(form.password);
    setPasswordError({
      ...passwError,
      isValid: errorInPassword.isValid,
      err: errorInPassword.err,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 max-md:w-[95%]">
        <label>
          Email{" "}
          {emailError.isValid && (
            <span className="text-red-500">{emailError.err}</span>
          )}
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onBlur={handleBlurEmail}
          onChange={handleFormChange}
          placeholder="Enter Email"
          className="bg-white/50 focus:bg-white w-full h-16 text-lg rounded-lg md:w-[29rem] p-5 focus:ring text-black"
        />
      </div>
      <Input
        name="password"
        label="Password"
        type={PasswordShow}
        value={form.password}
        passwordChecker={true}
        password={passwordDisplay}
        error={passwError}
        handleForm={handleFormChange}
        handleBlur={handleBlurPassword}
        handleFocus={handleFocus}
        handlePasswordDisplay={handlePasswordDisplay}
        placeholder="Enter your password"
        classeWraper={null}
        divClassName=""
      />
    </>
  );
};

export default SignInForm;
