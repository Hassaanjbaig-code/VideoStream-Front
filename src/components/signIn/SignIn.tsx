import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validationEmail,
  validatePassword,
} from "./../../Validation/InputValidation";
import {
  useLogInMutation,
  useResendMutation,
} from "../../redux/FetchApi/SignIn/SignIn";
import { SignInRequest } from "../../vite-env";
import { user } from "../input/Auth";
import ReactLoading from "react-loading";
import { signUpStore } from "../../hooks/auth";
import Alert2 from "../alert/Alert2";
import SignInForm from "./SignInForm";

const SignIn = () => {
  let navigation = useNavigate();
  const [verify, setVerify] = useState(false);
  const [logIn, { data, isLoading, isSuccess }] = useLogInMutation();
  const [resend, { isSuccess: ResendSuccess }] = useResendMutation()
  const [showError, setShowError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError("");
    const emailVerify = validationEmail(form.email);
    const passwordVerify = validatePassword(form.password);

    if (!emailVerify.isValid && !passwordVerify.isValid) {
      const signIn: SignInRequest = {
        email: form.email,
        password: form.password,
      };
      await logIn(signIn);

      if (isSuccess) {
        if (data?.status == 200) {
          if (data?.data?.verify) {
            let store = { token: data?.token, channel: data?.channel };
            signUpStore(store);
            if (data?.channel.status == 404) {
              navigation("/createChannel");
            } else {
              user.value = store;
              navigation("/");
            }
          } else {
            setVerify(true);
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
    } else {
      setShowError("Email and password is not written correctly");
    }
  };

  async function ALertCLose() {
    await resend(String(form.email))
    if (ResendSuccess) {
      setVerify(false)
    }
  }

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
          <SignInForm
            form={form}
            handleFormChange={handleFormChange}
            key={Math.random()}
          />

          <h2 className="text-xl text-red-500">{showError}</h2>
          {isLoading && (
            <ReactLoading type="spinningBubbles" color="#fff" height={"20%"} />
          )}
          <button
            type="submit"
            className="bg-white text-black/60 w-32 h-16 text-2xl border-2 hover:border-blue-400 rounded-2xl hover:transition-shadow delay-75 duration-100"
            disabled={isLoading}
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
      {verify && (
        <Alert2
          msg="Please verify your account"
          key={Math.random()}
          close={ALertCLose}
          buttonCalled="Resend"
        />
      )}
    </section>
  );
};

export default SignIn;
