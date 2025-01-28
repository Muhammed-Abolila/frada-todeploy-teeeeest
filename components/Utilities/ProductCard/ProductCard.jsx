import "./ProductCard.css";
import DiscAlert from "../DiscAlert/DiscAlert";
import { useEffect, useState } from "react";
import ProductCardImageHolder from "./ProductCardImageHolder/ProductCardImageHolder";
import CartAside from "../CartAside/CartAside";
const ProductCard = ({ item, setShowSearchPopup, searchWord, addToCard }) => {
  const [choosedColor, setChoosedColor] = useState(item.Colors[0]);
  const [globalIndex, setGlobalIndex] = useState(0);
  useEffect(() => {
    setChoosedColor(item.Colors[globalIndex]);
  }, [globalIndex, item]);
  return (
    <div className="product-card">
      {item && (
        <>
          <ProductCardImageHolder
            setShowSearchPopup={setShowSearchPopup}
            choosedColor={choosedColor}
            item={item}
            addToCard={addToCard}
          />
          <div className="product-card-caption">
            <h3>{item.Name}</h3>
            <div className="color-image-container">
              {item.Colors.length > 0 &&
                (item.Colors.length > 3 ? (
                  <>
                    {item.Colors.slice(0, 3).map((color, index) => (
                      <div
                        className="small-image"
                        style={{
                          border:
                            index == globalIndex
                              ? "1px solid #000"
                              : "1px solid #fff",
                        }}
                        key={index}
                      >
                        <img
                          loading="lazy"
                          src={`https://back.fradaksa.net/Laravel/public/Attachment/${
                            item.ProductID
                          }/${color.ColorID ? color?.ColorID : ""}/${
                            color.Image[0]
                          }`}
                          alt={item.Name}
                          width={40}
                          height={40}
                          onClick={() => {
                            setGlobalIndex(index);
                          }}
                        />
                      </div>
                    ))}
                    <span>+{item.Colors.length - 3}</span>
                  </>
                ) : (
                  item.Colors.map((color, index) => (
                    <div
                      className="small-image"
                      style={{
                        border:
                          index == globalIndex
                            ? "1px solid #000"
                            : "1px solid #fff",
                      }}
                      key={index}
                    >
                      <img
                        loading="lazy"
                        src={`https://back.fradaksa.net/Laravel/public/Attachment/${
                          item.ProductID
                        }/${color.ColorID ? color?.ColorID : ""}/${
                          color.Image[0]
                        }`}
                        alt={item.Name}
                        width={40}
                        height={40}
                        onClick={() => {
                          setGlobalIndex(index);
                        }}
                      />
                    </div>
                  ))
                ))}
            </div>
            <div className="price-container">
              <div className="price-after-disc">
                <div>رس</div>
                <div>{item.Price}</div>
              </div>
              {item.Discount ? (
                <div className="price-before-disc">
                  <div>رس</div>
                  <div>{item.SellPricePlusTax}</div>
                </div>
              ) : null}
            </div>
          </div>
          {item.Discount ? <DiscAlert disc={item.Discount} /> : null}
        </>
      )}
    </div>
  );
};

export default ProductCard;
