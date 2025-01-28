"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import whitewish from "../../../../public/Images/new/heart.svg";
import DiscAlert from "../../../Utilities/DiscAlert/DiscAlert";
import Card from "react-bootstrap/Card";
import "./CategoryProductCard.css";
import { Col } from "react-bootstrap";
import WishListHook from "@/app/customHooks/WishListHook/WishListHook";
export default function CategoryProductCard({ product, grid }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPhoto, setHoveredPhoto] = useState(
    `https://back.fradaksa.net/Laravel/public/Attachment/${product.ProductID}/${
      product?.Colors?.length > 0 && product?.Colors[0]?.ColorID
        ? product?.Colors[0]?.ColorID
        : ""
    }/${
      product?.Colors?.length > 0 && product?.Colors[0]?.Image
        ? product.Colors[0].Image[0]
        : ""
    }`,
    { next: { revalidate: 3 } }
  );
  const handlePhotoHoverSmall = (photo) => {
    setHoveredPhoto(photo);
  };
  // Wish List Logic
  const [wishData, onDeleteItem, addProductToWishList] = WishListHook();
  const [favProductId, setFavProductId] = useState([]);
  useEffect(() => {
    if (wishData) {
      let wishDataID = wishData?.products.map(
        (productId) => productId.ProductID
      );
      setFavProductId(wishDataID);
    }
  }, [wishData]);
  let favProduct = favProductId.includes(product.ProductID);
  return (
    <Col
      className={`col-${grid ? 6 : 12}`}
      md={{ span: grid ? 4 : 6 }}
      xl={{ span: grid ? 3 : 4 }}
      style={{ padding: "0px 2px" }}
    >
      <Card
        className="card-product"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={`${
            product?.CategoryID ? `/category/${product.CategoryID}` : ""
          }${
            product.SubcategoryID ? `/subcategory/${product.SubcategoryID}` : ""
          }/product/${product.ProductID}`}
          style={{ textDecoration: "none", color: "unset" }}
        >
          <Card.Img
            loading="lazy"
            variant="top"
            src={`${hoveredPhoto}`}
            alt={product.Name}
          />
          <Card.Body>
            <Card.Title className="name_product" style={{ fontWeight: "600" }}>
              {product.Name}
            </Card.Title>
            {!isHovered && (
              <div className="product-caption">
                <Card.Text
                  className="code_product"
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.95em",
                    color: "#9A9A9A",
                  }}
                >
                  {product.Barcode}
                </Card.Text>
                {product.Colors.length > 0 ? (
                  <Card.Text
                    className="color_product"
                    style={{ fontWeight: "600", fontSize: "1em" }}
                  >
                    {product?.Colors?.length} ألوان
                  </Card.Text>
                ) : null}
              </div>
            )}
            {isHovered && (
              <div className="product-caption">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <p
                    className="mx-2 d-flex align-items-center"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      color: "#9A9A9A",
                    }}
                  >
                    {product?.Colors?.length > 3 ? (
                      <span>+{product?.Colors?.length - 3}</span>
                    ) : null}
                  </p>

                  {product.Colors.length > 0 &&
                    product.Colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        style={{ marginLeft: "2%" }}
                        onMouseEnter={() =>
                          handlePhotoHoverSmall(
                            `https://back.fradaksa.net/Laravel/public/Attachment/${
                              product?.ProductID
                            }/${color?.ColorID != null ? color?.ColorID : ""}/${
                              color?.Image[0]
                            }`
                          )
                        }
                      >
                        <img
                          loading="lazy"
                          src={`https://back.fradaksa.net/Laravel/public/Attachment/${
                            product.ProductID
                          }/${color.ColorID ? color?.ColorID : ""}/${
                            color.Image[0]
                          }`}
                          alt={product.Name}
                          className="ml-2"
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="mobile-product-caption">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <p
                  className="mx-2 d-flex align-items-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    color: "#9A9A9A",
                  }}
                >
                  {product.Colors.length > 3 ? (
                    <span>+{product.Colors.length - 3}</span>
                  ) : null}
                </p>

                {product.Colors.length > 0 &&
                  product.Colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      style={{ marginLeft: "2%" }}
                      onMouseEnter={() =>
                        handlePhotoHoverSmall(
                          `https://back.fradaksa.net/Laravel/public/Attachment/${product.ProductID}/${color.ColorID}/${color.Image[0]}`
                        )
                      }
                    >
                      <img
                        loading="lazy"
                        src={`https://back.fradaksa.net/Laravel/public/Attachment/${
                          product.ProductID
                        }/${color.ColorID ? color.ColorID : ""}/${
                          color.Image[0]
                        }`}
                        alt={`Image ${index}`}
                        className="ml-2"
                        width={40}
                        height={40}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="price-container">
              <div className="price-after">
                <span>{product.Price}</span>
                <span>رس</span>
              </div>
              {product.Discount > 0 ? (
                <div className="price-before">
                  <span>{product.SellPricePlusTax}</span>
                  <span>رس</span>
                </div>
              ) : null}
            </div>
          </Card.Body>
        </Link>
        {product.Discount > 0 ? <DiscAlert disc={product.Discount} /> : null}
        {favProduct == true ? (
          <div
            className="wish-icon"
            style={{ backgroundColor: "black" }}
            onClick={() => onDeleteItem(product.ProductID)}
          >
            <Image
              src={whitewish}
              width="22px"
              height="22px"
              alt={product.Name}
            />
          </div>
        ) : (
          <div
            className="wish-icon"
            style={{ backgroundColor: "gray" }}
            onClick={() => addProductToWishList(product.ProductID)}
          >
            <Image
              src={whitewish}
              width="22px"
              height="22px"
              alt={product.Name}
            />
          </div>
        )}
      </Card>
    </Col>
  );
}
