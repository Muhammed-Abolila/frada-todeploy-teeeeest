import { useState, useEffect } from "react";
import "./CollectionProducts.css";
import { useDispatch } from "react-redux";
import { getCookie, setCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import { AddCollectionToCart } from "@/app/Redux/Actions/CollectionActions";
import CartHook from "@/app/customHooks/CartHooks/CartHook";
export const CollectionProducts = ({ collectionId, collectionProducts }) => {
  let [
    cartItems,
    cartSingleItems,
    cartCollctionItems,
    cartLength,
    cartReload,
    setCartReload,
    onDeleteItemPopup,
    showTabbyCard,
    setShowTabbyCard,
    handleQuantityChange,
    step,
    setStep,
    token,
    showForm,
    setShowForm,
    shippingCity,
    deliveryComment,
    setDeliveryComment,
    setShippingAddress,
    setShippingCity,
    addCoupon,
    couponName,
    onCouponChange,
    choosePaymentMethod,
    createOrder,
    regectedOrder,
    showDeleteItemPopup,
    ItemDelete,
    handleDelete,
    setDeleteItemPopup,
    cartNotify,
    cartGlobalIndex,
  ] = CartHook();
  const [selectedData, setSelectedData] = useState({});
  const [finalSelection, setFinalSelection] = useState([]);
  const [productsWithoutColorOrThickness, setProductsWithoutColorOrThickness] =
    useState([]);
  const [showError, setShowError] = useState(false);
  let dispatch = useDispatch();
  // Create session and set it in cookie
  useEffect(() => {
    if (!getCookie("session_id")) {
      const newSessionId = uuidv4();
      setCookie("session_id", newSessionId, { maxAge: 60 * 60 * 2 });
    }
  }, []);
  // Identify and store products without color or thickness
  useEffect(() => {
    const productsNoColorNoThickness = collectionProducts.filter(
      (product) => !product.Colors?.length && !product.thickness?.length
    );
    setProductsWithoutColorOrThickness(productsNoColorNoThickness);
  }, [collectionProducts]);
  // Initialize finalSelection with products without color or thickness
  useEffect(() => {
    if (productsWithoutColorOrThickness.length > 0) {
      const initialSelection = productsWithoutColorOrThickness.map(
        (product) => ({
          productId: product.ProductID,
          variantId: null,
        })
      );
      setFinalSelection(initialSelection);
    }
  }, [productsWithoutColorOrThickness]);
  // Function to handle product and color selection
  const getChoosedProductDataByColor = (productID, colorID) => {
    const selectedProduct = collectionProducts.find(
      (product) => product.ProductID === productID
    );
    const selectedColor = selectedProduct?.Colors?.find(
      (color) => color.ColorID === colorID
    );
    setFinalSelection((prevSelection) =>
      prevSelection.filter((item) => item.productId !== productID)
    );
    // Add the product to finalSelection if it has no sizes (only color)
    if (!selectedColor?.Sizes?.length) {
      let productHasColorNoSize = selectedColor?.Variants.filter(
        (product) => product?.ColorID == selectedColor?.ColorID
      );
      if (
        productHasColorNoSize[0].QuantityInCart !=
        productHasColorNoSize[0].VariantQuantity
      ) {
        setFinalSelection((prevSelection) => [
          ...prevSelection.filter((item) => item.productId !== productID),
          {
            productId: productID,
            variantId: productHasColorNoSize[0].VariantID,
          },
        ]);
      }
      setSelectedData((prevState) => ({
        ...prevState,
        [productID]: {
          ...prevState[productID],
          colorID,
          sizes: null,
          variants: null,
          sizeID: null,
          variantID: null,
          quantityInCart: productHasColorNoSize[0].QuantityInCart,
          variantQuantity: productHasColorNoSize[0].VariantQuantity,
        },
      }));
    } else {
      setSelectedData((prevState) => ({
        ...prevState,
        [productID]: {
          ...prevState[productID],
          colorID,
          sizes: selectedColor?.Sizes || [],
          variants: selectedColor?.Variants || [],
          sizeID: null,
          variantID: null,
          variantQuantity: null,
        },
      }));
    }
  };
  // Function to handle product and thickness selection
  const getChoosedProductDataByThickness = (productID, thicknessID) => {
    const selectedProduct = collectionProducts.find(
      (product) => product.ProductID === productID
    );
    const selectedThickness = selectedProduct?.thickness?.find(
      (thickness) => thickness.ThicknessID === thicknessID
    );
    setFinalSelection((prevSelection) =>
      prevSelection.filter((item) => item.productId !== productID)
    );
    setSelectedData((prevState) => ({
      ...prevState,
      [productID]: {
        ...prevState[productID],
        thicknessID,
        sizes: selectedThickness?.Sizes || [],
        variants: selectedThickness?.Variants || [],
        sizeID: null,
        variantID: null,
        variantQuantity: null,
      },
    }));
  };

  // Function to handle size selection and store VariantID in the finalSelection object
  const handleSizeSelection = (productID, size) => {
    const selectedProductData = selectedData[productID];
    let selectedVariant;
    if (selectedProductData?.colorID) {
      selectedVariant = selectedProductData.variants.find(
        (variant) =>
          variant.Size === size &&
          variant.ColorID === selectedProductData.colorID
      );
    }
    if (selectedProductData?.thicknessID) {
      selectedVariant = selectedProductData.variants.find(
        (variant) =>
          variant.Size === size &&
          variant.ThicknessID === selectedProductData.thicknessID
      );
    }
    const variantID = selectedVariant?.VariantID;
    const quantityInCart = selectedVariant?.QuantityInCart;
    const variantQuantity = selectedVariant?.VariantQuantity || 0;
    // Remove product from finalSelection if the size is changed
    setFinalSelection((prevSelection) =>
      prevSelection.filter((item) => item.productId !== productID)
    );
    // Update the selectedData with the chosen size and variantID
    setSelectedData((prevState) => ({
      ...prevState,
      [productID]: {
        ...prevState[productID],
        sizeID: size,
        variantID: variantID,
        quantityInCart: quantityInCart,
        variantQuantity: variantQuantity,
      },
    }));
    // Update finalSelection to include the product and its corresponding VariantID
    if (variantID && quantityInCart != variantQuantity) {
      setFinalSelection((prevSelection) => [
        ...prevSelection.filter((item) => item.productId !== productID),
        { productId: productID, variantId: variantID },
      ]);
    }
  };
  const addCollectionToCart = async () => {
    if (finalSelection.length == collectionProducts.length) {
      let formData = {
        CollectionID: collectionId,
        Collection: finalSelection.map((item) => ({
          product_id: item.productId,
          variant_id: item.variantId,
        })),
      };
      setCartReload(true)
      await dispatch(AddCollectionToCart(formData));
      setCartReload(false);
      setShowError(false)
    } else {
      setShowError(true)
    }
  };
  return (
    <div className="products-container">
      {collectionProducts &&
        collectionProducts.length > 0 &&
        collectionProducts.map((singleCollection, containerIndex) => (
          <div className="single-product" key={containerIndex}>
            <div className="header">
              <h6>المنتج رقم:{containerIndex + 1}</h6>
            </div>
            <div className="product-data">
              <h6 className="product-name">{singleCollection?.Name}</h6>
              {/* Color Selection */}
              {singleCollection?.Colors?.length > 0 && (
                <div className="colors-container">
                  <h6>إختر اللون</h6>
                  <div className="colors">
                    {singleCollection?.Colors.map((color, index) => (
                      <div
                        className="color"
                        key={index}
                        onClick={() =>
                          getChoosedProductDataByColor(
                            singleCollection?.ProductID,
                            color?.ColorID
                          )
                        }
                        style={{
                          border:
                            selectedData[singleCollection?.ProductID]
                              ?.colorID === color.ColorID
                              ? "1px solid #000"
                              : "1px solid rgb(221, 221, 221)",
                        }}
                      >
                        <img
                          src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${singleCollection?.ProductID}/${color?.ColorID}/${color?.Images[0]}`}
                          alt="color"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Thickness Selection */}
              {singleCollection?.thickness?.length > 0 && (
                <div className="thickness-container">
                  <h6>إختر السُمك</h6>
                  <div className="thickness">
                    {singleCollection?.thickness.map((thickness, index) => (
                      <div
                        className="single-thickness"
                        key={index}
                        onClick={() =>
                          getChoosedProductDataByThickness(
                            singleCollection?.ProductID,
                            thickness.ThicknessID
                          )
                        }
                        style={{
                          border:
                            selectedData[singleCollection?.ProductID]
                              ?.thicknessID === thickness.ThicknessID
                              ? "1px solid #000"
                              : "1px solid rgb(221, 221, 221)",
                        }}
                      >
                        <p>{thickness?.ThicknessName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Size Selection */}
              {(selectedData[singleCollection?.ProductID]?.sizes?.length > 0 ||
                selectedData[singleCollection?.ProductID]?.sizeID) && (
                <div className="sizes-container">
                  <h6>إختر المقاس</h6>
                  <div className="sizes">
                    {selectedData[singleCollection?.ProductID]?.sizes.map(
                      (size, index) => (
                        <div
                          className="size"
                          key={index}
                          onClick={() =>
                            handleSizeSelection(
                              singleCollection?.ProductID,
                              size
                            )
                          }
                          style={{
                            border:
                              selectedData[singleCollection?.ProductID]
                                ?.sizeID === size
                                ? "1px solid #000"
                                : "1px solid rgb(221, 221, 221)",
                          }}
                        >
                          <p>{size}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {singleCollection?.ProductNoColor?.length > 0 &&
                singleCollection?.thickness?.length <= 0 && (
                  <div className="product-image">
                    <h6>صوره المنتج</h6>
                    <div className="img-container">
                      <img
                        src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${singleCollection?.ProductID}/${singleCollection?.MainPhoto?.Image}`}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              {/* Availability */}
              {selectedData[singleCollection?.ProductID]?.variantQuantity !=
                undefined && (
                <div className="availability">
                  {selectedData[singleCollection?.ProductID]?.variantQuantity >
                  0 ? (
                    <>
                      {selectedData[singleCollection?.ProductID]
                        ?.variantQuantity ==
                      selectedData[singleCollection?.ProductID]
                        ?.quantityInCart ? (
                        <h6 style={{ color: "red" }}>لقد وصلت للحد الأقصي</h6>
                      ) : (
                        <h6 style={{ color: "green" }}>متاح في المخزن</h6>
                      )}
                    </>
                  ) : (
                    <h6 style={{ color: "red" }}>غير متاح في المخزن</h6>
                  )}
                </div>
              )}
              {!singleCollection?.thickness?.length > 0 &&
                !singleCollection?.Colors?.length > 0 && (
                  <div className="availability">
                    {singleCollection.branchProductInventory > 0 ? (
                      <>
                        {singleCollection.branchProductInventory ==
                          singleCollection.QuantityInCart ? (
                          <h6 style={{ color: "red" }}>لقد وصلت للحد الأقصي</h6>
                        ):(
                          <h6 style={{ color: "green" }}>متاح في المخزن</h6>
                        )}
                      </>
                    ) : (
                      <h6 style={{ color: "red" }}>غير متاح في المخزن</h6>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}
      <div className="btns">
      <div className="error" style={{transform:showError==true?"scale(1)":"scale(0)"}}>
        <p>قم بالإختيار من كل الخيارات المتاحة </p>
      </div>
        <button
          className="btn add-to-cart"
          onClick={() => addCollectionToCart()}
        >
          أضف للسلة
        </button>
      </div>
    </div>
  );
};
