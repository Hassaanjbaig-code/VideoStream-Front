import { PiVideoLight } from "react-icons/pi";
import { BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../input/Auth";

const Footer = () => {
  const Navbar = [
    { id: 1, path: "/", name: <BiHomeAlt size={30} /> },
    { id: 2, path: "/AddVideo", name: <PiVideoLight size={30} /> },
    { id: 3, path: "/channel", name: <CgProfile size={30} /> },
  ];
  
  return (
    <>
      {isLoggedIn.value && (
        <footer className="w-full h-14 bg-black/60 fixed bottom-0 z-10 ">
          <nav className="w-full h-full">
            <ul className="flex w-full justify-around items-center h-auto mt-4">
              {Navbar.map((nav) => (
                <li key={nav.id}>
                  <Link to={nav.path}>{nav.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      )}
    </>
  );
};

export default Footer;
