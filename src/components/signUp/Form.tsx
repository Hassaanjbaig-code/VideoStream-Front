    import React, { useState, ChangeEvent } from "react";
    import Input from "../input/Input";
    import {
    validateName,
    validationEmail,
    validatePassword,
    } from "../../Validation/InputValidation";

    interface FormProps {
    form: {
        name: string;
        email: string;
        password: string;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    }

    const Form: React.FC<FormProps> = ({ form, handleChange }) => {
    const [passwordDisplay, setPasswordDisplay] = useState(false);
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

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    if (!NameEror.isValid && !EmailEror.isValid && !PasswordEror.isValid) {
        
    }
    }
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
            error={NameEror}
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
            error={EmailEror}
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
            error={PasswordEror}
            handleForm={handleChange}
            handleBlur={handleBlurPassword}
            handleFocus={handleFocus}
            handlePasswordDisplay={handlePasswordDisplay}
            placeholder="Enter your password"
            divClassName={null}
        />
        </form>
    );
    };

    export default Form;
