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
import { signUpStore } from "../../hooks/auth";
import Alert2 from "../alert/Alert2";
import SignInForm from "./SignInForm";

const SignIn = () => {
  let navigation = useNavigate();
  const [verify, setVerify] = useState(false);
  const [logIn, { data, isLoading, isSuccess }] = useLogInMutation();
  const [resend, { isSuccess: ResendSuccess }] = useResendMutation();
  const [showError, setShowError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (form: { email: string; password: string }) => {
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
          if (data?.verify) {
            let store = { token: data?.token, channel: data?.channel };
            signUpStore(store);
            if (data?.channel.status == 404) {
              navigation("/createChannel");
            } else {
              user.value = store;
              navigation("/");
            }
          } else {
            setEmail(form.email);
            setVerify(true);
          }
        }

        return true;
      } else {
        setShowError("Email and Password is Incorrect");
        return false;
      }
    } else {
      setShowError("Email and password is not written correctly");
    }
  };

  async function ALertCLose() {
    await resend(String(email));
    if (ResendSuccess) {
      setVerify(false);
    }
  }

  return (
    <section className="w-full h-[140vh] flex justify-center items-center">
      <div className="md:w-[35rem] w-[95%] bg-black md:rainbow flex flex-col p-3 rounded-lg">
        <h2 className="text-center my-3 font-bold text-6xl text-white">
          Sign In
        </h2>
        <SignInForm
          key={Math.random()}
          isLoading={isLoading}
          showError={showError}
          handleSubmitForm={handleSubmit}
        />

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
