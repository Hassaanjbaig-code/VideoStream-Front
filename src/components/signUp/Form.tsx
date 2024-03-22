import React, { useState } from "react";
import Input from "../input/Input";
import {
  validateName,
  validationEmail,
  validatePassword,
} from "../../Validation/InputValidation";
import ReactLoading from "react-loading";

interface FormProps {
  isError: boolean;
  error: string | undefined;
  FormSubmit: (form: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  loading: boolean
}

const Form: React.FC<FormProps> = ({ isError, error, FormSubmit, loading }: FormProps) => {
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };
  const [NameError, setnameError] = useState({
    isValid: false,
    err: "",
  });
  const [EmailError, setemailError] = useState({
    isValid: false,
    err: "",
  });
  const [PasswordError, setpasswordError] = useState({
    isValid: false,
    err: "",
  });

  const handleBlurName = () => {
    const errorName = validateName(form.name);
    setnameError({
      ...NameError,
      isValid: errorName.isValid,
      err: errorName.err,
    });
  };
  const handleBlurEmail = () => {
    const errorEmail = validationEmail(form.email);
    setemailError({
      ...EmailError,
      isValid: errorEmail.isValid,
      err: errorEmail.err,
    });
  };
  const handleBlurPassword = () => {
    const errorPassword = validatePassword(form.password);
    setpasswordError({
      ...PasswordError,
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
  } else {
    PasswordShow = "password";
  }
  const handleFocus = () => {
    setnameError({
      isValid: false,
      err: "",
    });
  };

  const handleSignUp = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = FormSubmit({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (await data == true) {
      setForm({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <form
      className="flex flex-col gap-7 my-20 items-center justify-center"
      onSubmit={handleSignUp}
    >
      <Input
        name="name"
        label="Name"
        type="text"
        value={form.name}
        error={NameError}
        passwordChecker={false}
        handleForm={handleChange}
        handleBlur={handleBlurName}
        handleFocus={handleFocus}
        placeholder="Enter your name"
        classeWraper={null}
        divClassName={null}
      />

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
      <Input
        name="password"
        label="Password"
        type={PasswordShow}
        value={form.password}
        passwordChecker={true}
        classeWraper=""
        password={passwordDisplay}
        error={PasswordError}
        handleForm={handleChange}
        handleBlur={handleBlurPassword}
        handleFocus={handleFocus}
        handlePasswordDisplay={handlePasswordDisplay}
        placeholder="Enter your password"
        divClassName={null}
      />

      {isError && <p className="text-red-400 text-sm">{error}</p>}

      {loading && <ReactLoading color="#fff" type="bubbles" />}

      <button type="submit" className="p-5 bg-blue-600 w-44 h-16 rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default Form;
