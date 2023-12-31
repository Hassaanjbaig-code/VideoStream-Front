import React, { useState } from "react";
import Input from "../input/Input";
import {
  validateName,
  validationEmail,
  validatePassword,
} from "../../Validation/InputValidation";
import { useRegisterMutation } from "../../redux/FetchApi/SignUp/SignUp";
import { useNavigate } from "react-router-dom";
import { SigUpProps, SignUpRequest } from "../../vite-env";

export const SigUp: React.FC<SigUpProps> = ({ handleError }) => {
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [Error, setShowError] = useState("");
  const [register] = useRegisterMutation();
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [NameEror, setnameError] = useState({
    isValid: false,
    err: "",
  });
  const [EmailEror, setemailError] = useState({
    isValid: false,
    err: "",
  });
  const [PasswordEror, setpasswordError] = useState({
    isValid: false,
    err: "",
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlurName = () => {
    const errorName = validateName(form.name);
    setnameError({
      ...NameEror,
      isValid: errorName.isValid,
      err: errorName.err,
    });
  };
  const handleBlurEmail = () => {
    const errorEmail = validationEmail(form.email);
    setemailError({
      ...EmailEror,
      isValid: errorEmail.isValid,
      err: errorEmail.err,
    });
  };
  const handleBlurPassword = () => {
    const errorPassword = validatePassword(form.password);
    setpasswordError({
      ...PasswordEror,
      isValid: errorPassword.isValid,
      err: errorPassword.err,
    });
  };
  let PasswordShow = "password";
  const handlePasswordDisplay = () => {
    setPasswordDisplay(!passwordDisplay);
  };
  if (passwordDisplay === true) {
    PasswordShow = "text";
    // console.log(PasswordShow)
  } else {
    PasswordShow = "password";
  }
  const handleFocus = () => {
    setnameError({
      isValid: false,
      err: "",
    });
  };
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!NameEror.isValid && !EmailEror.isValid && !PasswordEror.isValid) {
      const signUp: SignUpRequest = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      // console.log(signUp)

      // Make the API request
      const result = (await register(signUp)) as any;
      console.log(result);

      if (result.status === 201) {
        console.log("User is created");
        setForm({
          name: "",
          email: "",
          password: "",
        });
        Navigate("/SignIn");
      } else {
        // console.log(result.error.data.message);
        handleError(result.error.data.message, result.status);
        setShowError(result.error.data.message);
      }
    } else {
      alert("Please Fill the Field correctly");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="md:w-[35rem] w-[92%] bg-black rainbow flex flex-col">
        <h2 className="text-center my-3 font-bold text-6xl text-white">
          Sign Up
        </h2>
        <form
          className="flex flex-col gap-7 my-20 items-center justify-center"
          onSubmit={handleSignUp}
        >
          <Input
            name="name"
            label="Name"
            type="text"
            value={form.name}
            error={NameEror}
            passwordChecker={false}
            handleForm={handleFormChange}
            handleBlur={handleBlurName}
            handleFocus={handleFocus}
            placeholder="Enter your name"
          />

          <Input
            name="email"
            label="Email"
            type="email"
            value={form.email}
            error={EmailEror}
            passwordChecker={false}
            handleForm={handleFormChange}
            handleBlur={handleBlurEmail}
            handleFocus={handleFocus}
            placeholder="Enter Email"
          />
          <Input
            name="password"
            label="Password"
            type={PasswordShow}
            value={form.password}
            passwordChecker={true}
            classeWraper=""
            password={passwordDisplay}
            error={PasswordEror}
            handleForm={handleFormChange}
            handleBlur={handleBlurPassword}
            handleFocus={handleFocus}
            handlePasswordDisplay={handlePasswordDisplay}
            placeholder="Enter your password"
          />
          {Error.length !== 0 && (
            <p className="text-red-400 text-sm">{Error}</p>
          )}
          <button
            type="submit"
            className="p-5 bg-blue-600 w-44 h-16 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
