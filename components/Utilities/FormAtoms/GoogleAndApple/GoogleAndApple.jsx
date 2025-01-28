import "./GoogleAndApple.css"
import { setCookie } from "cookies-next";
import Image from "next/image";
import apple from "../../../../public/Images/Login/apple.png";
import google from "../../../../public/Images/Login/bmnm.png";
import Link from "next/link";
export const GoogleAndApple = ({pathName,title}) => {
  return (
    <div className="google-apple-container">
      <div className="google-apple-title">{title}</div>
      <div className="google-apple"  onClick={()=> setCookie("pathName",pathName)}>
        <Link href="https://back.fradaksa.net/auth/google">
          <Image loading="lazy" src={google} alt="frada" />
        </Link>
        <Image loading="lazy" src={apple} alt="frada" />
      </div>
    </div>
  );
};