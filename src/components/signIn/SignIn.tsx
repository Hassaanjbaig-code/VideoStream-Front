import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validationEmail,
  validatePassword,
} from "./../../Validation/InputValidation";
import { useLogInMutation } from "../../redux/FetchApi/SignIn/SignIn";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { SerializedError } from "@reduxjs/toolkit";
import Input from "../input/Input";
import {
  SignInRequest,
} from "../../vite-env";
import { user } from "../input/Auth";
import ReactLoading from "react-loading";

const SignIn = () => {
  let navigation = useNavigate();
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [logIn, { data, isLoading, isSuccess }] =
    useLogInMutation();
  const [showError, setShowError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailError.isValid && !passwError.isValid) {
      const signIn: SignInRequest = {
        email: form.email,
        password: form.password,
      };
      await logIn(signIn);

      if (isSuccess) {
        if (data?.status == 200) {
          let store = {
            token: data?.token,
            channel: data?.channel,
          };
          localStorage.setItem("User Detail", JSON.stringify(store));
          if (data?.channel.status == 404) {
            navigation("/createChannel");
          } else {
            user.value = store;
            navigation("/");
          }
        }
      } else {
        setShowError("Email and Password is Incorrect");
        // console.error(error);
      }
      setForm({
        email: "",
        password: "",
      });
    }
  };

  return (
    <section className="w-full h-[140vh] flex justify-center items-center">
      <div className="md:w-[35rem] w-[95%] bg-black md:rainbow flex flex-col p-3 rounded-lg">
        <h2 className="text-center my-3 font-bold text-6xl text-white">
          Sign In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 my-20 items-center justify-center"
        >
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
          <h2 className="text-xl text-red-500">{showError}</h2>
          {isLoading && (
            <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
          )}
          <button
            type="submit"
            className="bg-white text-black/60 w-32 h-16 text-2xl border-2 hover:border-blue-400 rounded-2xl hover:transition-shadow delay-75 duration-100"
          >
            Log In
          </button>
          <p>
            How to create a New Account? Just{" "}
            <button
              type="button"
              className="text-blue-700 border-none bg-transparent"
              onClick={() => navigation("/SignUp")}
            >
              Click Me
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
