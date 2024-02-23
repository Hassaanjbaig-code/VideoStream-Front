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
        <section className="w-full h-14 fixed bottom-0 bg-black/60  ">
          <nav className="w-full">
            <ul className="flex w-full justify-around items-center h-full my-4">
              {Navbar.map((nav) => (
                <li key={nav.id}>
                  <Link to={nav.path}>{nav.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}
    </>
  );
};

export default Footer;
