"use client";
import "./Otheroffer.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import HomeProducts from "../HomeProducts/HomeProducts";
import ProductCard from "../../Utilities/ProductCard/ProductCard";
import { motion ,useScroll,useTransform} from 'framer-motion';
import { useEffect, useRef, useState } from "react";
export default function Otheroffer({ allProducts, addToCard }) {
  const[number,setNumber]=useState(0)
  useEffect(()=>{
    if(window.innerWidth>700){
      setNumber(710)
    }else{
      setNumber(250)
    }
  },[window.innerWidth])
  let otherofferRef=useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  useEffect(() => {
    if (otherofferRef.current) {
      setSectionTop(otherofferRef.current.offsetTop);
    }
  }, [otherofferRef]);
  let {scrollY}=useScroll();
  // let translateY=useTransform(scrollY,[sectionTop-number,sectionTop-(number-70)],[200,0])
  let translateY=useTransform(scrollY,[sectionTop-number,sectionTop-(number-70)],[300,0])
  let opacity=useTransform(scrollY,[sectionTop-number,sectionTop-(number-70)],[0,1]);
  return (
    <div className="otheroffer" ref={otherofferRef}>
      <Container fluid>
        <Row>
          <motion.div
            className="otheroffer-left col-12 col-md-6"
            style={{translateY,opacity, paddingLeft: "0px", paddingRight: "0px" ,transition:"1.5s"}}
          >
            <div className="product-cart-container">
              {allProducts
                ? allProducts.map((product) => (
                    <ProductCard
                      key={product.ProductID}
                      item={product}
                      addToCard={addToCard}
                    />
                  ))
                : null}
            </div>
          </motion.div>
          <motion.div className="otheroffer-right col-12 p-1 col-lg-6"
          style={{translateY,opacity,transition:"1.5s",}}
          >
            <div className="ads-container">
              <div className="layer"></div>
              <div className="ads-caption">
                <div className="content">
                  <h4>&quot;رمز الهوية والتراث العريق&quot;</h4>
                  <h5>الزي السعودي</h5>
                  <Link
                    href="/"
                    style={{
                      textDecoration: "none",
                      color: "unset",
                    }}
                  >
                    <Button>إكتشف المزيد</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </Row>
      </Container>
      <div className="otheroffer-slider">
        <HomeProducts allProducts={allProducts} />
      </div>
    </div>
  );
}
