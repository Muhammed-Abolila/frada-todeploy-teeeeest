import { Container } from "react-bootstrap";
import "./ProductDescription.css";
import { useState } from "react";
const ProductDescription = ({ productData }) => {
  const [activeLink, setActiveLink] = useState(0);
  return (
    <>
      {productData?.Product_Description &&
      productData?.Product_Description?.length > 0 ? (
        <Container>
          <div className="product-description-container">
            <ul className="list-links list-unstyled d-flex flex-row-reverse align-items-center gap-3 px-1">
              <li
                className={`p-2 rounded ${activeLink == 0 && "active"}`}
                onClick={() => setActiveLink(0)}
              >
                وصف المنتج
              </li>
              {/* <li className={`p-2 rounded ${activeLink==1&& "active"}`} onClick={()=>setActiveLink(1)}>معلومات إضافية</li> */}
              {/* <li className={`p-2 rounded ${activeLink==2&& "active"}`} onClick={()=>setActiveLink(2)}>معلومات العلامة التجارية</li> */}
            </ul>
            <div className="content">
              {activeLink == 0 ? (
                <div className="product-desc">
                  {productData?.Product_Description?.map((desc,index) => (
                    <div className="product-desc-content" key={index}>
                      {desc?.Title&&
                      <h6>{desc?.Title}</h6>
                      }
                      {desc?.Description&&
                       <p>{desc?.Description}</p>
                      }
                    </div>
                  ))}
                </div>
              ) : activeLink == 1 ? (
                <div
                  className="product-additional-info"
                >
                  معلومات إضافية
                </div>
              ) : (
                <div className="product-trademark">
                  محتوي معلومات العلامة التجارية
                </div>
              )}
            </div>
          </div>
        </Container>
      ) : null}
    </>
  );
};
export default ProductDescription;
