import React, { useState, useEffect, useCallback } from "react";
import { useRegisterMutation } from "../../redux/FetchApi/SignUp/SignUp";
import { useNavigate } from "react-router-dom";
import { SigUpProps, SignUpRequest } from "../../vite-env";
import Alert2 from "../alert/Alert2";
import Form from "./Form";
import {
  validateName,
  validationEmail,
  validatePassword,
  } from "../../Validation/InputValidation";

export const SigUp: React.FC<SigUpProps> = () => {
  
  const [openALert, setOpenAlert] = useState({
    show: false,
    msg: ""
  });
  const [register, { isError, error: SignUpError, isSuccess }] =
    useRegisterMutation();
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validateName(form.name)
    const emailError = validationEmail(form.email)
    const passwordError = validatePassword(form.password)

    if (nameError.isValid && emailError.isValid && passwordError.isValid) {
      const signUp: SignUpRequest = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      let result = await register(signUp);
    } else {
      setOpenAlert({
        show: true,
        msg: "Please fill the form correctly"
      })
    }
  };
  const CheckAccount = useCallback(() => {
    if (isSuccess) {
      setForm({
        name: "",
        email: "",
        password: "",
      });
      // Navigate("/SignIn");
      setOpenAlert({
        show: true,
        msg:"Please verify your email"
      });
      // }
    }
  }, [setForm, Navigate, isSuccess]);

  useEffect(() => {
    CheckAccount();
  }, [isSuccess, CheckAccount]);

  function CloseAlert() {
    setOpenAlert({
      show: false,
      msg: ""
    });
  }

  return (
    <>
      <section className="w-full md:h-[140vh] h-screen flex justify-center items-center">
        <div className="md:w-[35rem] w-[92%] bg-black rainbow flex flex-col">
          <h2 className="text-center my-3 font-bold text-6xl text-white">
            Sign Up
          </h2>
          <form
            className="flex flex-col gap-7 my-20 items-center justify-center"
            onSubmit={handleSignUp}
          >

            <Form form={form} handleChange={handleFormChange} key={Math.random()} />
            
            {isError && (
              <p className="text-red-400 text-sm">
                {SignUpError?.data.message}
              </p>
            )}
            <button
              type="submit"
              className="p-5 bg-blue-600 w-44 h-16 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
        {openALert.show == false && (
          <Alert2
            msg={openALert.msg}
            close={CloseAlert}
          />
        )}
      </section>
    </>
  );
};
