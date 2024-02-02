import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../input/Auth";


const Nav = () => {
  let navigate = useNavigate();
  // const logOut = () => {
  //   localStorage.removeItem("User Detail");
  //   // storedUserDetail = undefined
  //   navigate("/");
  // };

  // useEffect(() => {
  //   console.log(isLoggedIn.value)
  // }, [isLoggedIn])

  console.log(isLoggedIn.value)
  


  return (
    <nav className="w-full h-20 flex justify-between items-center shadow-lg shadow-black">
      <Link to="/">
        <button type="button" className="ml-4">
          <h2>Video Stream</h2>
        </button>
      </Link>
      <ul className="flex gap-5 mr-7 items-center">
        {isLoggedIn.value ? (
          <li>
            <button
              type="button"
              className="w-32 h-14 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              onClick={() => logout()}
            >
              Log Out
            </button>
          </li>
        ) : (
          <>
            <li>
              <button
                type="button"
                className="w-32 h-14 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                onClick={() => navigate("/SignIn")}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-32 h-14 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
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
