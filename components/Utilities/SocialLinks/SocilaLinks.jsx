import "./SocialLinks.css";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
const SocilaLinks = ({ text }) => {
  return (
    <div className="social-links">
      <p>{text}</p>
      <ul >
        <li>
          <a href="https://www.facebook.com/fradaksa" target="_blank">
          <FaFacebookF />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/fradaksa/?igsh=YzljYTk1ODg3Zg%3D%3D" target="_blank">
          <IoLogoInstagram />
          </a>
        </li>
        <li>
          <a href="https://x.com/FradaKSA?s=20" target="_blank">
          <FaXTwitter />
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@fradaksa?_t=8oQ6MxxDRkS&_r=1" target="_blank">
          <FaTiktok />
          </a>
        </li>
        <li>
          <a href="https://snapchat.com/t/dDme5zjb" target="_blank">
          <FaSnapchatGhost />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SocilaLinks;