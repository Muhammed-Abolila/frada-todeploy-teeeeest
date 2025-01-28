"use client";
import "./FilterComp.css";
import "react-range-slider-input/dist/style.css";
import RangeSlider from "react-range-slider-input";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

export default function FilterComp({
  filter,
  setFilter,
  showApplyAndDeleteBtn,
  setShowApplyAndDeleteBtn,
  products,
  setQueryStringfromFilter,
  onDeleteFilter,
}) {
  // Open Filter And His Items
  const [openOffers, setOpenOffers] = useState(true);
  const [openDiscounts, setOpenDiscounts] = useState(true);
  const [openTradmark, setOpenTradmark] = useState(true);
  const [openSizes, setOpenSizes] = useState(true);
  const [openColors, setOpenColors] = useState(true);
  // Get Filter Data
  const [filterDiscount, setFilterDiscount] = useState([]);
  const [filterTrademarks, setFilterTrademarks] = useState([]);
  const [filterSize, setFilterSize] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  // Send Filter Data To Api
  const [selectedSort, setSelectedSort] = useState(0);
  const [selectedfilterDiscount, setSelectedFilterDiscount] = useState(0);
  const [selectedfilterTrademarkID, setSelectedfilterTrademarkID] = useState(
    []
  );
  const [selectedfilterSize, setSelectedfilterSize] = useState([]);
  const [selectedfilterColorId, setSelectedFilterColorId] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);
  const [valuePrice, setValuePrice] = useState([0, 3000]);
  // useEffect To Get Filter Data
  useEffect(() => {
    try {
      if (products) {
        setFilterDiscount(products.discount);
        setFilterTrademarks(products.trademarks);
        setFilterSize(products.sizes);
        setFilterColors(products.colors);
      }
    } catch (e) {
      console.log(e);
    }
  }, [products]);

  // Handle Multi Trademark Select
  const handleSelectedTrademark = (trademarkId) => {
    if (
      selectedfilterTrademarkID &&
      selectedfilterTrademarkID.includes(trademarkId)
    ) {
      setSelectedfilterTrademarkID([
        ...selectedfilterTrademarkID.filter(
          (tradeId) => tradeId != trademarkId
        ),
      ]);
    } else {
      setSelectedfilterTrademarkID([...selectedfilterTrademarkID, trademarkId]);
    }
  };
  // Handle Multi Size Select
  const handleSelectedSize = (size) => {
    if (selectedfilterSize && selectedfilterSize.includes(size)) {
      setSelectedfilterSize([
        ...selectedfilterSize.filter((newSize) => newSize != size),
      ]);
    } else {
      setSelectedfilterSize([...selectedfilterSize, size]);
    }
  };
  // Handle Multi Select Colors
  const handleSelectedColor = (colorId) => {
    if (selectedfilterColorId && selectedfilterColorId.includes(colorId)) {
      setSelectedFilterColorId([
        ...selectedfilterColorId.filter((newColor) => newColor != colorId),
      ]);
    } else {
      setSelectedFilterColorId([...selectedfilterColorId, colorId]);
    }
  };
  //  Send Filtered Data To Api
  const SendFilterDataToApi = async () => {
    try {
      const queryParams = [
        ...(selectedfilterTrademarkID.length >= 1
          ? selectedfilterTrademarkID.map(
              (tradeId) => `TrademarkID[]=${tradeId}`
            )
          : []),
        ...(selectedfilterColorId.length >= 1
          ? selectedfilterColorId.map((colorId) => `ColorID[]=${colorId}`)
          : []),
        selectedSort != "" && `sort=${selectedSort}`,
        selectedfilterDiscount != 0 && `Discount=${selectedfilterDiscount}`,
        ...(selectedfilterSize.length >= 1
          ? selectedfilterSize.map((size) => `Size[]=${size}`)
          : []),
        valuePrice && `min=${valuePrice[0]}`,
        valuePrice && `max=${valuePrice[1]}`,
      ];
      setQueryStringfromFilter(queryParams);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    SendFilterDataToApi();
  }, [
    selectedSort,
    selectedfilterDiscount,
    selectedfilterTrademarkID,
    selectedfilterSize,
    selectedfilterColorId,
    valuePrice,
  ]);
  // when click delete in small screens
  const handleDelete = async () => {
    setSelectedSort("");
    setSelectedFilterDiscount(0);
    setSelectedfilterTrademarkID(0);
    setSelectedfilterSize([]);
    setSelectedFilterColorId([]);
    setValuePrice([valuePrice[0], valuePrice[1]]);
    onDeleteFilter();
    setFilter(!filter);
    setShowApplyAndDeleteBtn(false);
  };
  // Set Filter Position Depend on ScrollY
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const position = window.scrollY;
    setScrollPosition(position);
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`filter ${filter ? "filter-position" : ""}`}
        style={{
          minWidth: filter ? "320px" : "0px",
          height:
            scrollPosition < 200
              ? `calc(100vh - (230px - ${scrollPosition}px))`
              : `calc(100vh - 60px`,
        }}
      >
        <div
          className="filter-content"
          style={{ display: filter ? "block" : "none" }}
        >
          <div className="sort-container">
            <h6 onClick={() => setOpenOffers(!openOffers)}>
              <span>الترتيب حسب</span>
              {openOffers == true ? (
                <FaAngleUp />
              ) : (
                // <span className="icon-cheveron-up"></span>
                <FaAngleDown />

                // <span className="icon-cheveron-down"></span>
              )}
            </h6>
            <div
              className="sort-items"
              style={{ display: openOffers ? "block" : "none" }}
            >
              <div className="single-sort-item">
                <input
                  type="radio"
                  name="sort"
                  id="all"
                  onChange={(e) => setSelectedSort("")}
                />
                <label htmlFor="all">الأبرز</label>
              </div>
              <div className="single-sort-item">
                <input
                  type="radio"
                  name="sort"
                  id="htl"
                  onChange={() => setSelectedSort("htl")}
                />
                <label htmlFor="htl">الأعلي سعراً</label>
              </div>
              <div className="single-sort-item">
                <input
                  type="radio"
                  name="sort"
                  id="lth"
                  onChange={() => setSelectedSort("lth")}
                />
                <label htmlFor="lth">الأدني سعراً</label>
              </div>
            </div>
          </div>

          {/* <div className="offers-container">
          <h6 onClick={() => setOpenOffers(!openOffers)}>
            <span>العروض</span>
            {openOffers == true ? (
              <span className="icon-cheveron-up"></span>
            ) : (
              <span className="icon-cheveron-down"></span>
            )}
          </h6>
          <div
            className="offers"
            style={{ display: openOffers ? "block" : "none" }}
          >
            <div className="offer">
              <input type="checkbox" id="today" />
              <label htmlFor="today">عرض اليوم</label>
            </div>
            <div className="offer">
              <input type="checkbox" id="friday" />
              <label htmlFor="friday">الجمعة البيضاء</label>
            </div>
            <div className="offer">
              <input type="checkbox" id="dec" />
              <label htmlFor="dec">عروض ديسمبر من فرادا</label>
            </div>
          </div>
        </div> */}

          {filterDiscount && filterDiscount.length > 0 ? (
            <div className="discounts-container">
              <h6 onClick={() => setOpenDiscounts(!openDiscounts)}>
                <span>الخصومات</span>
                {openDiscounts == true ? (
                  // <span className="icon-cheveron-up"></span>
                  <FaAngleDown />
                ) : (
                  // <span className="icon-cheveron-down"></span>
                  <FaAngleUp />
                )}
              </h6>

              <select
                style={{ display: openDiscounts ? "block" : "none" }}
                value={selectedfilterDiscount}
                onChange={(e) => setSelectedFilterDiscount(e.target.value)}
              >
                <option value={0}>إختر من الخصومات</option>
                {filterDiscount.map((discount) => (
                  <option key={discount} value={discount}>
                    {discount}%
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {filterTrademarks && filterTrademarks.length > 0 ? (
            <div className="tradmarks-container">
              <h6 onClick={() => setOpenTradmark(!openTradmark)}>
                <span>العلامات التجارية</span>
                {openTradmark == true ? (
                  // <span className="icon-cheveron-up"></span>
                  <FaAngleUp />
                ) : (
                  <FaAngleDown />

                  // <span className="icon-cheveron-down"></span>
                )}
              </h6>

              <div
                className="tradmarks"
                style={{ display: openTradmark ? "block" : "none" }}
              >
                {filterTrademarks.map((trademark) => (
                  <div className="tradmark" key={trademark?.TrademarkID}>
                    <input
                      type="checkbox"
                      id={trademark?.TrademarkID}
                      value={trademark?.TrademarkID}
                      onChange={(e) => handleSelectedTrademark(e.target.value)}
                    />
                    <label htmlFor={trademark?.TrademarkID}>
                      {trademark?.TrademarkName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {filterSize && filterSize.length > 0 ? (
            <div className="sizes-container">
              <h6 onClick={() => setOpenSizes(!openSizes)}>
                <span>المقاسات</span>
                {openSizes == true ? (
                  <FaAngleUp />
                ) : (
                  // <span className="icon-cheveron-up"></span>
                  <FaAngleDown />

                  // <span className="icon-cheveron-down"></span>
                )}
              </h6>
              <div
                className="sizes"
                style={{ display: openSizes ? "flex" : "none" }}
              >
                {filterSize.map((size) => (
                  <div
                    className="size"
                    style={{
                      color: selectedfilterSize.includes(size)
                        ? "#fff"
                        : "#000",
                      backgroundColor: selectedfilterSize.includes(size)
                        ? "#000"
                        : "#fff",
                    }}
                    key={size}
                    onClick={() => handleSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {filterColors && filterColors.length > 0 ? (
            <div className="colors-container">
              <h6 onClick={() => setOpenColors(!openColors)}>
                <span>الألوان</span>
                {openColors == true ? (
                  <FaAngleUp />
                ) : (
                  // <span className="icon-cheveron-up"></span>
                  <FaAngleDown />

                  // <span className="icon-cheveron-down"></span>
                )}
              </h6>
              <div
                className="colors"
                style={{ display: openColors ? "flex" : "none" }}
              >
                {filterColors.map((color, index) => (
                  <div
                    key={index}
                    className="color"
                    style={{ backgroundColor: `${color.ColorHex}` }}
                    onClick={() => handleSelectedColor(color.ColorID)}
                  >
                    <span
                      className="icon-check"
                      style={{
                        display: selectedfilterColorId.includes(color.ColorID)
                          ? "block"
                          : "none",
                        color: color.ColorHex == "#000000" ? "#fff" : "#000",
                      }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="price-container">
            <h6>السعر</h6>
            <RangeSlider
              min={0}
              max={3000}
              step={1}
              value={valuePrice}
              onInput={setValuePrice}
            />
            <div className="price-range">
              <div>
                <span>رس</span>
                <span>{valuePrice[0]}</span>
              </div>
              <div>
                <span>رس</span>
                <span>{valuePrice[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="apply-delete-btns"
        style={{ bottom: showApplyAndDeleteBtn == true ? "0px" : "-50%" }}
      >
        <button
          className="apply-btn"
          onClick={() => {
            setFilter(!filter), setShowApplyAndDeleteBtn(false);
          }}
        >
          تنفيذ
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          مسح
        </button>
      </div>
    </>
  );
}
