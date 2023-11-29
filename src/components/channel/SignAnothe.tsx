import { signal } from "@preact/signals-react";
import React from "react";
import {
  validatePassword,
  validationEmail,
} from "../../Validation/InputValidation";
import {
  CustomResponseSignIn,
  CustomResponseSignInError,
  SignAnotheProps,
  SignInRequest,
} from "../../vite-env";
import { useLogInMutation } from "../../redux/FetchApi/SignIn/SignIn";
import { Link } from "react-router-dom";

const SignAnothe: React.FC<SignAnotheProps> = ({ close })  => {
  const [logIn] = useLogInMutation();
  let form = signal({
    email: "",
    password: "",
  });

  let showError = signal("");

  let error = signal({
    isValid: false,
    err: "",
  });

  let passwError = signal({
    isValid: false,
    err: "",
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    form.value = {
      ...form.value,
      [e.target.name]: e.target.value,
    };
  }

  const handleBlurEmail = () => {
    const getError = validationEmail(form.value.email);
    error.value = {
      ...error.value,
      isValid: getError.isValid,
      err: getError.err,
    };
  };

  const handleBlurPassword = () => {
    const errorInPassword = validatePassword(form.value.password);
    passwError.value = {
      ...passwError.value,
      isValid: errorInPassword.isValid,
      err: errorInPassword.err,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!error.value.isValid && !passwError.value.isValid) {
      const signIn: SignInRequest = {
        email: form.value.email,
        password: form.value.password,
      };
      let response = await logIn(signIn);

      if ("data" in response) {
        const result = response as unknown as CustomResponseSignIn;
        console.log(result);
        if (result.data.status == 200) {
          let store = {
            token: result.data.token,
            channel: result.data.channel,
          };
          localStorage.setItem(`User Detail`, JSON.stringify(store));
          console.log(localStorage.getItem("User Detail"));
        }
      } else {
        // It's an error response
        const errorResponse = response as {
          error: CustomResponseSignInError;
        };
        // Handle the error case
        showError.value = errorResponse.error.data.message;
        console.error("Error:", errorResponse.error.data);
      }
      form.value = {
        email: "",
        password: "",
      };
    }
  };

  return (
    <div className="w-[35rem] bg-black rainbow flex flex-col">
      <button type="button" onClick={close} name="AddNew">
        Close
      </button>
      <h2 className="text-center my-3 font-bold text-6xl text-white">
        Sign In
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 my-20 items-center justify-center"
      >
        <div className="flex flex-col gap-2">
          <label>
            Email{" "}
            {error.value.isValid && (
              <span className="text-red-500">{error.value.err}</span>
            )}
          </label>
          <input
            name="email"
            type="email"
            value={form.value.email}
            onBlur={handleBlurEmail}
            onChange={handleFormChange}
            placeholder="Enter Email"
            className="bg-white/50 focus:bg-white h-16 text-lg rounded-lg w-[29rem] p-5 focus:ring text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="w-[26rem]">
            Password{" "}
            {passwError.value.isValid && (
              <span className="text-red-500 text-[12px]">
                {passwError.value.err}
              </span>
            )}
          </label>
          <input
            name="password"
            type="password"
            value={form.value.password}
            onChange={handleFormChange}
            onBlur={handleBlurPassword}
            placeholder="Enter Password"
            className="bg-white/50 focus:bg-white h-16 text-lg rounded-lg w-[29rem] p-5 focus:ring text-black"
          />
        </div>
        <h2 className="text-xl text-red-500">{showError.value}</h2>
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
          >
            <Link to="/SignUp">Click Me</Link>
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignAnothe;
// function logIn(signIn: SignInRequest) {
//   throw new Error("Function not implemented.");
// }
