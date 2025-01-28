import Image from "next/image";
import Checkout from "../../../public/Images/Icons/2nd Bar/new/checkout_icon.svg";
import Help from "../../../public/Images/Icons/2nd Bar/new/customer_help_Icon.svg";
import MyWishes from "../../../public/Images/Icons/2nd Bar/new/My_Wishes_Button_icon.svg";
import Cart from "../../../public/Images/Icons/2nd Bar/new/shop_now_icon.svg";
import Exporters from "../../../public/Images/Icons/2nd Bar/new/Exporters.svg";
import fradaLogo from "../../../public/Images/SVG Header Icons/large-logo.svg";
import myAcc from "../../../public/Images/Icons/2nd Bar/new/My-account-icon.svg";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Container, Row } from "react-bootstrap";
// import MiddleNavHook from "../../../src/customHooks/MiddleNavHook/MiddleNavHook";
import { motion } from "framer-motion";
import MiddleNavHook from "@/app/customHooks/MiddleNavHook/MiddleNavHook";
export default function Middle({ cartLength, onSearch, searchWord }) {
  const [showLogin, setShowLogin, navigateToRoute, logOut] = MiddleNavHook();
  return (
    <section className="header-nav  bg-white">
      <Container>
        <Row> 
          <Col lg={{ span: 2 }} xl={{ span: 2 }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "unset",
              }}
            >
              <div className="logo">
                <Image src={fradaLogo} alt="Logo" />
              </div>
            </Link>
          </Col>
          <Col lg={{ span: 3 }} xl={{ span: 3, offset: 1 }}>
            <div className="input-group m-auto">
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
          <Col lg={{ span: 7 }} xl={{ span: 6 }}>
            <div className="option-list">
              <div className="option">
                <Image src={Checkout} alt="Checkout" className="option-img" />
                <p className="option-desc">متابعة الشراء</p>
              </div>
              <div className="option">
                <Image src={Exporters} alt="Checkout" className="option-img" />
                <p className="option-desc">تجار وموزعين</p>
              </div>
              <div
                className="option cart-container"
                onClick={() => navigateToRoute("cart")}
              >
                <Image
                  src={Cart}
                  alt="Complete Transactions"
                  className="option-img"
                  style={{
                    width: "40px",
                  }}
                />
                <p className="option-desc">سلتـي</p>
                {cartLength >= 0 && (
                  <motion.div
                    className="cart-length"
                    key={cartLength}
                    animate={{ scale: [1, 1.15, 1] }}
                  >
                    <p>{cartLength}</p>
                  </motion.div>
                )}
              </div>
              <div className="option" onClick={() => navigateToRoute("wishes")}>
                <Image src={MyWishes} alt="Wishes" className="option-img" />
                <p className="option-desc">أمنياتي</p>
              </div>
              <div
                className="option"
                onClick={() => navigateToRoute("services/faq")}
              >
                <Image src={Help} alt="Help" className="option-img" />
                <p className="option-desc">مركز المساعدة</p>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <div className="option">
                    <Image src={myAcc} alt="Help" className="option-img" />
                    <p className="option-desc">حسابي</p>
                  </div>
                </Dropdown.Toggle>
                {showLogin ? (
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigateToRoute("dashboard/user-info")}>
                      لوحة التحكم
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => logOut()}>
                      تسجيل الخروج
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigateToRoute("login")}>
                      تسجيل الدخول
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
