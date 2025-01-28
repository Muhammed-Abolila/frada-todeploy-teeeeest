import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import fradaLogo from "../../../public/Images/SVG Header Icons/middle-logo.svg";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
const MiddleNavbar = ({ setShowSidebar, onSearch, searchWord }) => {
  return (
    <div className="middle-nav">
      <Container fluid>
        <Row style={{ alignItems: "center" }}>
          <Col xs={{ span: 4 }} className="logo-column">
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "unset",
              }}
            >
              <div className="logo">
                <Image src={fradaLogo} alt="" />
              </div>
            </Link>
          </Col>
          <Col xs={{ span: 6, offset: 1 }} className="search-column">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
              <FiSearch />
              </span>
              <input
                value={searchWord}
                onChange={() => {
                  onSearch(event);
                }}
                type="text"
                className="form-control"
                placeholder="إبحث عن منتجك"
              />
            </div>
          </Col>
          <Col xs={{ span: 1 }} className="icon-column">
            <div className="icon" onClick={() => setShowSidebar(true)}>
            <MdOutlineMenu />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MiddleNavbar;
