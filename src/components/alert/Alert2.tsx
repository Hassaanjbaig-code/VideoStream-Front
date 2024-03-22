import React from "react";

interface Alert2 {
  msg: string | undefined;
  close: React.MouseEventHandler<HTMLButtonElement>;
  buttonCalled: string
}

const Alert2 = ({ msg, close, buttonCalled="Close" }: Alert2) => {
  return (
    <div className="w-full h-full flex justify-center items-center z-50 bg-[#00000080] fixed top-0">
      <div className="flex flex-col h-40 bg-[#555252] rounded-lg p-5 m-1 justify-between w-96">
        <p className="font-bold text-xl">{msg}</p>
        <div className="w-full flex flex-row-reverse">
          <button
            type="button"
            onClick={close}
            className="w-20 h-8 text-lg rounded-md bg-blue-400 hover:bg-blue-500 focus:bg-blue-600 font-semibold"
          >
            {buttonCalled}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert2;
