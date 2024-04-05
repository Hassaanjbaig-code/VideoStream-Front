import React, { useEffect } from "react";
import { validationEmail } from "../../Validation/InputValidation";
import Input from "../input/Input";
import { useResendEmailMutation } from "../../redux/FetchApi/SignUp/SignUp";
import ReactLoading from "react-loading";
import Alert2 from "../alert/Alert2";
import { ResendError } from "../../vite-env";

interface openALert {
  show: boolean;
  msg: string | undefined;
}

const ResendMail = () => {
  const [resendEmail, { isLoading, data, isSuccess, isError, error }] =
    useResendEmailMutation();
  const [EmailError, setemailError] = React.useState({
    isValid: false,
    err: "",
  });

  const [openALert, setOpenAlert] = React.useState<openALert>({
    show: false,
    msg: "",
  });

  const [form, setForm] = React.useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleBlurEmail = () => {
    const errorEmail = validationEmail(form.email);
    setemailError({
      ...EmailError,
      isValid: errorEmail.isValid,
      err: errorEmail.err,
    });
  };
  const handleFocus = () => {
    setemailError({
      isValid: false,
      err: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EmailError.isValid) {
      await resendEmail({ email: String(form.email) });
    }
  };

  // if (isSuccess) {
  // }

  useEffect(() => {
    setOpenAlert({
      show: isSuccess,
      msg: data?.msg,
    });
  }, [isSuccess, data]);

  function CloseAlert() {
    setOpenAlert({
      show: false,
      msg: "",
    });
  }
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:w-[35rem] w-[92%] bg-black rainbow grid flex-col justify-items-center gap-6 p-5"
      >
        <h2 className="my-3 font-bold md:text-6xl text-5xl text-white">
          Resend Mail
        </h2>

        <Input
          name="email"
          label="Email"
          type="email"
          value={form.email}
          error={EmailError}
          passwordChecker={false}
          handleForm={handleChange}
          handleBlur={handleBlurEmail}
          handleFocus={handleFocus}
          placeholder="Enter Email"
          classeWraper={null}
          divClassName={null}
        />

        {isError && (
          <p className="text-red-400 text-sm">
            {(error as ResendError)?.data.msg}
          </p>
        )}

        {isLoading && <ReactLoading color="#fff" type="bubbles" />}
        {openALert.show && (
          <Alert2
            msg={openALert.msg}
            close={CloseAlert}
            buttonCalled={"Close"}
          />
        )}

        <button
          type="submit"
          className="p-5 cursor-pointer bg-blue-600 w-44 h-16 rounded-lg"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ResendMail;
