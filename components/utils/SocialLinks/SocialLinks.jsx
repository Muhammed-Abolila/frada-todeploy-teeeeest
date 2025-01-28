import "./SocialLinks.css";
const SocialLinks = ({ text }) => {
  return (
    <div className="social-links">
      <p>{text}</p>
      <ul>
        <li>
          <a href="https://www.facebook.com/fradaksa" target="_blank">
            <i className="icon-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/fradaksa/?igsh=YzljYTk1ODg3Zg%3D%3D" target="_blank">
            <i className="icon-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://x.com/FradaKSA?s=20" target="_blank">
            <i className="icon-x"></i>
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@fradaksa?_t=8oQ6MxxDRkS&_r=1" target="_blank">
            <i className="icon-tiktok"></i>
          </a>
        </li>
        <li>
          <a href="https://snapchat.com/t/dDme5zjb" target="_blank">
            <i className="icon-snapchat-ghost"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SocialLinks;