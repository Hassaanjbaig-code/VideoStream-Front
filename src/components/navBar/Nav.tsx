import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../input/Auth";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-20 flex justify-around items-center shadow-lg shadow-black">
      <Link to="/">
        <button type="button" className="">
          <h2>Video Stream</h2>
        </button>
      </Link>
      <ul className="flex gap-5 items-center">
        {isLoggedIn.value ? (
          <li>
            <Link to="/">
              <button
                type="button"
                className="w-32 max-sm:w-20 max-sm:h-16 max-sm:rounded-sm h-14 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                onClick={() => logout()}
              >
                Log Out
              </button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <button
                type="button"
                className="w-28 md:w-32 h-14 max-sm:w-[5.5rem] max-sm:h-16 max-sm:rounded-sm
                transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                onClick={() => navigate("/SignIn")}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-28 md:w-32 h-14 max-sm:w-[5.5rem] max-sm:h-16 max-sm:rounded-sm
                 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                onClick={() => navigate("/SignUp")}
              >
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
