import "./SidebarMenu.css";
import { useState, useEffect, useRef } from "react";
import SocilaLinks from "../SocialLinks/SocilaLinks";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { token } from "../../../src/Redux/Types";
import { deleteCookie } from "cookies-next";
import { motion } from "framer-motion";
import { token } from "@/app/Redux/Types";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const SidebarMenu = ({ categories, showSidebar, setShowSidebar }) => {
  let router = useRouter();
  // Show SubCategory
  let [showSubCategory, setShowSubCategory] = useState(false);
  let [filterdCategoryData, setfilterdCategoryData] = useState();
  const getSubCategoryData = (id) => {
    let filterdCategory = categories.filter(
      (filterdCategory) => filterdCategory.CategoryID === id
    );
    setfilterdCategoryData(filterdCategory);
  };
  // LogIn and LogOut
  const [isLogin, setIsLogin] = useState(false);
  const checkLogin = () => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, [isLogin]);
  const onLogOut = () => {
    deleteCookie("access_token");
    deleteCookie("userName");
    router.push("/");
    setIsLogin(false);
    setShowSidebar(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const onLogin = () => {
    router.push("/login");
    setShowSidebar(false);
  };
  let sidebarMenuRef = useRef(null);
  const [sidebarMenuHeight, setSidebarMenuHeight] = useState(0);
  useEffect(() => {
    setSidebarMenuHeight(sidebarMenuRef?.current?.offsetHeight);
  }, []);
  let sidebarMenuVariants = {
    open: {
      clipPath: `circle(${sidebarMenuHeight * 2 + 200}px at 450px 0px)`,
      transition: { duration: 0.6 },
    },
    closed: {
      clipPath: `circle(0px at 450px 0px)`,
      transition: { duration: 0.4 },
    },
  };
  return (
    <motion.div
      className={`sidebar-menu ${
        window.location.pathname.includes("dashboard")
          ? " w-[calc(100%_-_45px)]"
          : "w-full"
      }`}
      ref={sidebarMenuRef}
      variants={sidebarMenuVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="sidebar-category">
        <div className="top">
          {/* <span
            className="icon-close"
            onClick={() => setShowSidebar(false)}
          ></span> */}
          <IoClose className="text-xl" onClick={() => setShowSidebar(false)} />

          <h5>القائمة</h5>
        </div>
        <ul className="category-links">
          {/* <li>
            <div className="single-category-link">
              <Link
                href="collections"
                as="collections"
                className="listed-desc"
                style={{ textDecoration: "none", color: "unset" }}
              >
                <h6 onClick={() => setShowSidebar(false)}>
                  <h6>العروض والخصومات</h6>
                </h6>
              </Link>
            </div>
          </li> */}
          {categories.length > 0 &&
            categories.map((category) => (
              <li key={category.CategoryID}>
                <div className="single-category-link">
                  {category.subcategories.length > 0 ? (
                    <div
                      onClick={() => {
                        getSubCategoryData(category.CategoryID),
                          setShowSubCategory(true);
                      }}
                      className="listed-desc flex justify-between items-center"
                    >
                      <MdNavigateNext />
                      <h6>{category.arabic_name}</h6>
                    </div>
                  ) : (
                    <Link
                      href={"category/" + category.CategoryID}
                      className="listed-desc"
                      style={{ textDecoration: "none", color: "unset" }}
                    >
                      <h6 onClick={() => setShowSidebar(false)}>
                        {category.arabic_name}
                      </h6>
                    </Link>
                  )}
                </div>
              </li>
            ))}
        </ul>
        <ul className="about-us-links">
          {isLogin == true ? (
            <li className="logout" onClick={onLogOut}>
              <h6>تسجيل الخروج</h6>
            </li>
          ) : (
            <li className="login" onClick={onLogin}>
              <h6>تسجيل الدخول</h6>
            </li>
          )}
        </ul>

        <div className="social-links-container">
          <SocilaLinks text={"تابعنا علي مواقع التواصل الإجتماعي"} />
        </div>
      </div>
      <div
        className="sidebar-subcategory"
        style={{ left: `${showSubCategory === false ? "-100%" : "0"}` }}
      >
        {filterdCategoryData &&
          filterdCategoryData.map((filteredCategory) => (
            <>
              <div className="top">
                <IoClose
                  className="text-xl"
                  onClick={() => setShowSubCategory(false)}
                />

                <h5>{filteredCategory.Name}</h5>
              </div>
              <ul className="subcategory-links">
                <li
                  onClick={() => {
                    setShowSidebar(false), setShowSubCategory(false);
                  }}
                >
                  <div className="single-subcategory-link">
                    <Link
                      href={`/category/${filteredCategory.CategoryID}`}
                      className="listed-desc"
                      style={{ textDecoration: "none", color: "unset" }}
                    >
                      <h6>عرض الكل</h6>
                    </Link>
                  </div>
                </li>
                {filteredCategory.subcategories &&
                  filteredCategory.subcategories.map((subCategory) => (
                    <li
                      key={subCategory.SubcategoryID}
                      onClick={() => {
                        setShowSidebar(false), setShowSubCategory(false);
                      }}
                    >
                      <div className="single-subcategory-link">
                        <Link
                          href={`/category/${filteredCategory.CategoryID}/subcategory/${subCategory.SubcategoryID}`}
                          as={`/category/${filteredCategory.CategoryID}/subcategory/${subCategory.SubcategoryID}`}
                          className="listed-desc"
                          style={{ textDecoration: "none", color: "unset" }}
                        >
                          <h6>{subCategory.arabic_name}</h6>
                        </Link>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          ))}
      </div>
    </motion.div>
  );
};
export default SidebarMenu;
