import { AiOutlineStop } from "react-icons/ai";

export default function noAuthPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AiOutlineStop color="red" size={40} />
      <h2>You are need to Sign in to view this page</h2>
    </div>
  );
}
