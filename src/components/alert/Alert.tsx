import { FaDiagramSuccessor } from "react-icons/fa6";
interface AlertProp {
  mes: string | undefined
}

const Alert = ({ mes }: AlertProp) => {
  return (
    <div className="absolute top-0 flex justify-center w-full animate-DropDownAlert ">
      <div className="flex gap-3 w-64 h-16 items-center bg-[#5f9ea0f5] p-4 rounded-md">
        <FaDiagramSuccessor />
        <p className="text-white font-bold text-lg">{mes}</p>
      </div>
    </div>
  );
};

export default Alert;
