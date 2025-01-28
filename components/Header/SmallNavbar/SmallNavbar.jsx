import { Container } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import mobileLogo from "../../../public/Images/SVG Header Icons/mobile-logo.svg";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
const SmallNavbar = ({ setShowSidebar,onSearch,searchWord }) => {
  // Show Search Input
  let [showSearchInput, setShowSearchInput] = useState(false);
  const inputGroup = useRef(null);
  const searchInput = useRef(null);
  const logo = useRef(null);
  const showSearchInputFun = () => {
    setShowSearchInput(!showSearchInput);
  };
  useEffect(() => {
    if (showSearchInput === false) {
      inputGroup.current.style.width = "fit-content";
      searchInput.current.style.display = "none";
      logo.current.style.display = "block";
    } else if (showSearchInput === true) {
      inputGroup.current.style.width = "90%";
      searchInput.current.style.display = "block";
      logo.current.style.display = "none";
    }
  }, [showSearchInput]);
  return (
    <div className="small-nav">
      <Container fluid>
        <div className="small-nav-content">
          <div className="input-group" ref={inputGroup}>
            <span
              onClick={showSearchInputFun}
              className="input-group-text"
              id="basic-addon1"
            >
              <FiSearch />
              </span>
            <input
            value={searchWord}
            onChange={()=>{onSearch(event)}}
              ref={searchInput}
              type="text"
              className="form-control"
              placeholder="إبحث عن منتجك"
            />
          </div>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "unset"
            }}
          >
            <div className="logo" ref={logo}>
              <Image src={mobileLogo} alt="" />
            </div>
          </Link>
          <div className="icon" onClick={() => setShowSidebar(true)}>
          <MdOutlineMenu />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SmallNavbar
