"use client";
import Up from "./EachHeader/Up";
import Middle from "./EachHeader/Middle";
import Bottom from "./EachHeader/Bottom";
import "./Header.css";
import MiddleNavbar from "./MiddleNavbar/MiddleNavbar";
import SmallNavbar from "./SmallNavbar/SmallNavbar";
import SidebarMenu from "../Utilities/SidebarMenu/SidebarMenu";
// import CartHook from "../../src/customHooks/CartHooks/CartHook";
// import HeaderHook from "../../src/customHooks/HeaderHook/HeaderHook";
import Search from "./Search/Search";
import { AnimatePresence } from "framer-motion";
import CartHook from "@/app/customHooks/CartHooks/CartHook";
import HeaderHook from "@/app/customHooks/HeaderHook/HeaderHook";
import { useRouter } from "next/router";
import HeaderUp from "./1-HeaderUp/HeaderUp";

export default function Header() {
  const [
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
    notify,
    globalIndex,
  ] = CartHook();
  const [
    onSearch,
    searchWord,
    categories,
    setShowSidebar,
    showSidebar,
    loading,
    showSearchPopup,
    setShowSearchPopup,
    showallProductsPage,
  ] = HeaderHook();
  return (
    <>
      <header className="sticky top-0  z-[1000000]">
        <div className="large-header">
          {/* <Up /> */}
          <HeaderUp />

          <Middle
            cartLength={cartLength}
            onSearch={onSearch}
            searchWord={searchWord}
          />
          <Bottom
            categories={categories}
            cartData={cartItems}
            showDeleteItemPopup={showDeleteItemPopup}
            handleDelete={handleDelete}
            setDeleteItemPopup={setDeleteItemPopup}
            onDeleteItemPopup={onDeleteItemPopup}
            ItemDelete={ItemDelete}
          />
        </div>
        <MiddleNavbar
          setShowSidebar={setShowSidebar}
          onSearch={onSearch}
          searchWord={searchWord}
        />
        <SmallNavbar
          setShowSidebar={setShowSidebar}
          onSearch={onSearch}
          searchWord={searchWord}
        />
        <AnimatePresence>
          {showSidebar && (
            
            <SidebarMenu
              categories={categories}
              loading={loading}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          )}
        </AnimatePresence>

        {showSearchPopup == true && (
          <Search
            searchWord={searchWord}
            showallProductsPage={showallProductsPage}
            setShowSearchPopup={setShowSearchPopup}
          />
        )}
      </header>
    </>
  );
}
