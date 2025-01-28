import Link from "next/link";
import "./PoliciesSideBar.css"
const PoliciesSideBar = ({title,sidebarCaption,pathname,sidebarLinks}) => {
  return (
    <div className="policies-sidebar">
        <div className="top">
          <div className="caption">
            <h2>{title}</h2>
            {sidebarCaption&&sidebarCaption.length>0?(
              sidebarCaption.map((caption,index)=>
                <p key={index}>{caption.caption}</p>
              )
            ):null}
          </div>
        </div>
          <ul className="links">
            {sidebarLinks.length>0?(
              sidebarLinks.map((link,index)=>
              <li key={index} className={pathname==`${link.href}`&&"active"}><Link href={`${link.href}`}>{link.title}</Link></li>
              )
            ):null}
          </ul>
      </div>
  )
}

export default PoliciesSideBar