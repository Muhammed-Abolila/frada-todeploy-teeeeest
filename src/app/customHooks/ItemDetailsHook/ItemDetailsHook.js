"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import WishListHook from "../WishListHook/WishListHook";
import CartHook from "../CartHooks/CartHook";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  GetProductDetails,
} from "../../Redux/Actions/ItemDetailsActions";
import { getCookie, setCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import SnapTrackEvents from "./../SnapTrackEvents/SnapTrackEvents";
const ItemDetailsHook = (productId) => {
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
  let id = useParams();
  const [globalIndex, setGlobalIndex] = useState();
  const [indexOfColor, setIndexOfColor] = useState(0);
  const [singleproduct, setSingleProduct] = useState({});
  const [variant, setVariant] = useState(null);
  const [Size, setSize] = useState();
  const [choosedSize, setChoosedSize] = useState(0);
  const [showSizes, setShowSizes] = useState(false);
  const [choosedColorId, setChoosedColorId] = useState(0);
  const [showStock, setShowStock] = useState(false);
  const [stockQty, setStockQty] = useState(0);
  const [thickIndex, setThickIndex] = useState(null);
  const [thickID, setThickID] = useState(0);
  const [thickName, setThickName] = useState(0);
  const [thickSizeIndex, setThickSizeIndex] = useState(null);
  const [thicknessSizeChoosed, setThicknessSizeChoosed] = useState([]);
  const [showEmailLayout, setShowEmailLayout] = useState(false);
  const dispatch = useDispatch();
  const [isInfull, setIsInFull] = useState(false);
  // Create session and set it in cookie
  useEffect(() => {
    if (!getCookie("session_id")) {
      const newSessionId = uuidv4();
      setCookie("session_id", newSessionId, { maxAge: 60 * 60 * 2 });
    }
  }, []);
  // Get All Data
  useEffect(() => {
    const getProductData = async () => {
      await dispatch(
        GetProductDetails(id?.ProductID ? id?.ProductID : productId)
      );
    };
    getProductData();
    setStockQty(0);
  }, [id, productId]);
  const productDetailsRes = useSelector(
    (state) => state.ItemDetailsReducer.ProductDetails
  );
  let productData = {};
  let loading = true;
  try {
    if (productDetailsRes?.data) {
      (productData = productDetailsRes.data), (loading = false);
    } else {
      loading = true;
    }
  } catch (e) {
    console.log(e);
  }
  // Get Data Depend On globalIndex
  useEffect(() => {
    try {
      if (productData.ProductNoColor) {
        if (productData.ProductNoColor.length >= 1) {
          setSingleProduct(productData.ProductNoColor);
          setStockQty(productData.productQuantityInventory);
          setVariant(null);
        } else {
          if (productData.Colors.length >= 0) {
            setSingleProduct(productData.Colors[indexOfColor]);
            if (singleproduct.Variants) {
              let variant = singleproduct.Variants.filter(
                (variant) =>
                  variant.ColorID == choosedColorId &&
                  variant.Size == choosedSize
              );
              setVariant(...variant);
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [productData, globalIndex, Size, choosedColorId]);
  // Get Choosed ColorId By Click On Image
  const handleChooseColor = (color, index) => {
    setChoosedColorId(color.ColorID);
    setGlobalIndex(index);
    setIndexOfColor(index);
    setChoosedSize();
    setIsInFull(false);
    setSize();
    setStockQty(0);
    if (color.Sizes == null) {
      let productVariantFiltered = color.Variants.filter(
        (product) => product.ColorID == color.ColorID
      );
      setStockQty(productVariantFiltered[0]?.VariantQuantity);
      setShowStock(true);
    } else {
      setShowStock(false);
      setShowSizes(true);
    }
  };
  // Get Choosed Size By Click On Size
  const handleSizeClick = (size, index) => {
    setChoosedSize(size);
    setSize(index);
    let productVariantFiltered = singleproduct.Variants.filter(
      (variant) => variant.ColorID == choosedColorId && variant.Size == size
    );
    setStockQty(productVariantFiltered[0].VariantQuantity);
    setShowStock(true);
  };
  const handleChoosedThick = (thick, index) => {
    setThickIndex(index);
    setThickName(thick.ThicknessName);
    setThickID(thick.ThicknessID);
    setThicknessSizeChoosed(thick.Sizes);
    setChoosedSize();
    setThickSizeIndex(null);
    setIsInFull(false);
    setShowStock(false);
    setStockQty(0);
  };
  const handleChoosedThickSize = (size, index) => {
    setChoosedSize(size);
    setThickSizeIndex(index);
    setIsInFull(false);
    let productThickFiltered = productData.thickness.filter(
      (item) => item?.ThicknessName == thickName && item?.ThicknessID == thickID
    );
    let productThickFilteredVariant = productThickFiltered[0]?.Variants.filter(
      (item) => item?.Size == size && item?.ThicknessID == thickID
    );
    setVariant(productThickFilteredVariant[0]);
    setStockQty(productThickFilteredVariant[0]?.VariantQuantity);
    setShowStock(true);
  };
  // add product to cart
  const addToCart = async () => {
    let formData = {
      productID: productData.ProductID,
      variantID: variant?.VariantID ? variant?.VariantID : "",
      size: choosedSize ? choosedSize : null,
    };
    try {
      setCartReload(true);
      await dispatch(AddToCart(formData));
      setCartReload(false);
      SnapTrackEvents(
        "ADD_CART",
        response?.data?.Quantity,
        "KSA",
        productData.Price,
        productData.Barcode,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
    } catch (e) {
      console.log(e);
    }
  };
  const funcToCompareQty = (filteredProduct) => {
    if (filteredProduct) {
      if (filteredProduct?.length > 0) {
        if (
          filteredProduct[0].Quantity ==
          filteredProduct[0].productQuantityInventory
        ) {
          setIsInFull(true);
        }
      } else {
        setIsInFull(false);
      }
    }
  };
  useEffect(() => {
    if (productData.Colors?.length == 0 && productData.thickness?.length == 0) {
      const filteredProduct = cartItems?.cartItems.filter(
        (item) => item?.ProductID === productData?.ProductID
      );
      funcToCompareQty(filteredProduct);
    } else if (
      productData.Colors?.length > 0 ||
      productData.thickness?.length > 0
    ) {
      if (variant) {
        const filteredProduct = cartItems?.cartItems.filter(
          (item) => item?.VariantID === variant?.VariantID
        );
        funcToCompareQty(filteredProduct);
      }
    }
  }, [variant?.VariantID, cartItems]);
  // Wish List Logic
  const [wishData, onDeleteItem, addProductToWishList] = WishListHook();
  const [favProductId, setFavProductId] = useState([]);
  useEffect(() => {
    if (wishData) {
      let wishDataID = wishData?.products?.map((productId) => productId.ProductID);
      setFavProductId(wishDataID);
    }
  }, [wishData]);
  let favProduct = favProductId.includes(productData.ProductID);
  // Start Tabby Logic
  const [tabbyPrice, setTabbyPrice] = useState(Number);
  const [scriptLoading, setScriptLoading] = useState(true);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.tabby.ai/tabby-promo.js";
    document.body.appendChild(script);
    script.onload = () => {
      setScriptLoading(false);
    };
  }, []);
  useEffect(() => {
    setTabbyPrice(productData?.Price);
  }, [productData]);
  return [
    loading,
    singleproduct,
    handleChooseColor,
    productData,
    Size,
    showSizes,
    showStock,
    stockQty,
    handleSizeClick,
    addToCart,
    addProductToWishList,
    onDeleteItem,
    favProduct,
    globalIndex,
    handleChoosedThick,
    handleChoosedThickSize,
    thickIndex,
    thickSizeIndex,
    thicknessSizeChoosed,
    tabbyPrice,
    scriptLoading,
    isInfull,
    showEmailLayout,
    setShowEmailLayout,
    cartReload,
  ];
};
export default ItemDetailsHook;
