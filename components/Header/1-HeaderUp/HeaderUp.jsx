import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HeaderUp.css";
import SocilaLinks from "../../../components/Utilities/SocialLinks/SocilaLinks";
// import SocialLinks from "../../Utilities/SocialLinks copy/SocialLinks";
import { FaPhoneAlt } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to get discount data
const getOffersData = async () => {
  try {
    let response = await fetch(`${API_URL}/DiscountAndOffers`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("تحقق من إتصالك بالإنترنت");
    }
    let data = await response.json();
    return data; // return the fetched data
  } catch (e) {
    console.log(e);
  }
};

const HeaderUp = () => {
  const [discountData, setDiscountData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOffersData();
      
      setDiscountData(data);
    };
    
    fetchData();
  }, []); 

  return (
    // <Container>
    //   <Row>
    //     <Col>
    //       <h3>hello world</h3>
    //       {discountData ? (
    //         <div>
    //           <h1>كله تمام جدا</h1>
    //         </div>
    //       ) : (
    //         <p>Loading discounts...</p>
    //       )}
    //     </Col>
    //   </Row>
    // </Container>
    <div className="navbar-top-content">
    <Container>
      <Row>
        <Col xs={{ span: 1 }} md={{ span: 4 }} lg={{ span: 3 }}>
          <div className="phone-number">
          <FaPhoneAlt className="icon-phone"/>

            
            <p>+966-55-766-5585</p>
            <p>إتصل بنا اليوم</p>
            <h1 className=""></h1>
          </div>
        </Col>
        <Col  xs={{ span: 10 }} md={{ span: 4 }} lg={{ span: 6 }}>
          {discountData ? (
            <div className="offer">
              <div className="content">
                {discountData?.Discount ? (
                  <>
                    <span>خصومات تصل إلي</span>
                    <span>{discountData?.Discount}%</span>
                  </>
                ) : (
                  <span>{discountData?.Offers}</span>
                )}
              </div>
            </div>
          ) : null}
        
        </Col>
        <Col xs={{ span: 1 }} md={{ span: 4 }} lg={{ span: 3 }} className="flex justify-center items-center ">
          <div className="social-links-container">
            <SocilaLinks />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default HeaderUp;
