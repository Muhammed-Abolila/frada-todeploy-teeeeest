import Image from "next/image";
import "./PoliciesHeader.css";
import { useEffect, useState } from "react";
const PoliciesHeader = ({sidebarLinks,pathname,bgImage}) => {  
  const [captionHead,setCaptionHead]=useState("")
  useEffect(()=>{
    sidebarLinks.map((link)=>{
      if(link.href==pathname){
        setCaptionHead(link.title)
      }
    })
  },[pathname]);
  return (
    <div className="head-policies">
      <Image src={bgImage} />
      <div className="caption">
        <h3>{captionHead}</h3>
      </div>
    </div>
  );
};
export default PoliciesHeader;