import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface input {
  name: string;
  label: string;
  type: string;
  error: Terror | undefined;
  value: string;
  classeWraper: string | null;
  password?: boolean | null;
  passwordChecker: boolean;
  placeholder: string;
  handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  handleForm: React.ChangeEventHandler<HTMLInputElement>;
  handleFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
  handlePasswordDisplay?: React.MouseEventHandler<HTMLButtonElement>;
  divClassName: string | null;
}

interface Terror {
  isValid: boolean;
  err: string;
}

const Input = ({
  name,
  label,
  type,
  error,
  password,
  value,
  passwordChecker,
  classeWraper,
  handleBlur,
  handleForm,
  handleFocus,
  handlePasswordDisplay,
  placeholder,
  divClassName,
}: input) => {
  return (
    <div
      className={`flex flex-col gap-2 relative md:w-[29rem] w-[95%] ${divClassName}`}
    >
      <label className="w-full">
        {label}{" "}
        {error !== undefined && error.isValid && <span className="text-red-500">{error.err}</span> }
      </label>
      <div className={`${passwordChecker ? "relative" : "" } w-full`}>
        <input
          name={name}
          type={type}
          value={value}
          onBlur={handleBlur}
          onChange={handleForm}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`bg-white/50 focus:bg-white h-16 text-lg w-full md:p-5 rounded-lg p-4 focus:ring text-black ${classeWraper}`}
        />
        {
          passwordChecker ? (
            <button
              type="button"
              onClick={handlePasswordDisplay}
              className="absolute flex justify-end bottom-[1.35rem] right-1"
            >
              {password ? (
                <AiOutlineEye color="black" fontSize="17px" />
              ) : (
                <AiOutlineEyeInvisible color="black" fontSize="17px" />
              )}
            </button>
          ) : null // Optionally, you can return null when passwordChecker is false
        }
      </div>
    </div>
  );
};

export default Input;
