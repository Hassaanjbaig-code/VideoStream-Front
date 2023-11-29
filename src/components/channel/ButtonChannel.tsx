import { useNavigate } from "react-router-dom";

const ButtonChannel = ({button}: any) => {
    const navigate = useNavigate()
  return (
    <div className="flex gap-2">
      <button
        type="button"
        name="AddNew"
        className="text-white bg-gray-700 w-44 rounded-lg text-sm"
        onClick={button}
      >
        Add Andther Account
      </button>
      <button
        type="button"
        className="text-white bg-gray-700 w-44 rounded-lg text-sm"
        onClick={() => navigate("/SignUp")}
      >
        Create new Account
      </button>
      <button
        type="button"
        name="SwitchAccount"
        className="text-white bg-gray-700 w-44 rounded-lg text-sm"
        onClick={button}
      >
        Switch an Account
      </button>
    </div>
  );
};

export default ButtonChannel;
