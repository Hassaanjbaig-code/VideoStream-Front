import { FaWhatsapp, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const SHare = () => {
  return (
    <div className="absolute w-72 h-48">
      <ul className="flex overflow-x-auto gap-4">
        <li>
          <a href="#">
            <FaWhatsapp />
          </a>
        </li>
        <li>
          <a href="#">
            <FaFacebookSquare />
          </a>
        </li>
        <li>
          <a href="#">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="#">
            <RiTwitterXFill />
          </a>
        </li>
      </ul>


    </div>
  );
};

export default SHare;
