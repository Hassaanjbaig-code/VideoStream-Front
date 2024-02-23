import React from "react";

interface InputProps {
  name: string;
  label: string;
  error: Terror;
  value: string;
  classeWraper?: string;
  placeholder: string;
  handleBlur: React.FocusEventHandler<HTMLTextAreaElement>; // Update the type here
  handleForm: React.ChangeEventHandler<HTMLTextAreaElement>; // Update the type here
  handleFocus: React.FocusEventHandler<HTMLTextAreaElement>; // Update the type here
}

interface Terror {
  isValid: boolean;
  err: string;
}

const TextArea = ({
  name,
  label,
  error,
  value,
  classeWraper,
  handleBlur,
  handleForm,
  handleFocus,
  placeholder,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 relative md:w-[29rem] items-center w-[95%]">
      <label className="w-full">
        {label}{" "}
        {error.isValid && <span className="text-red-500">{error.err}</span>}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={handleBlur}
        onChange={handleForm}
        onFocus={handleFocus}
        className={`bg-white/50 focus:bg-white h-52 text-lg rounded-lg w-full md:p-5 p-4 focus:ring text-black ${classeWraper}`}
      />
    </div>
  );
};

export default TextArea;
