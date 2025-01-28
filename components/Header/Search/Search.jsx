import SearchHook from "@/app/customHooks/SearchHook/SearchHook";
import ProductCard from "../../Utilities/ProductCard/ProductCard";
// import SearchHook from "../../../src/customHooks/SearchHook/SearchHook";
import "./Search.css";
import { useEffect, useState } from "react";
const Search = ({searchWord, showallProductsPage, setShowSearchPopup }) => {
  const [SearchProducts,sliceNumber] = SearchHook();
  return (
    <>
      {SearchProducts && (
        <div className="search">
          {SearchProducts.products && SearchProducts.products.length > 0 ? (
            <>
              <div className="search-cards-container">
                {SearchProducts.products
                  .slice(0, sliceNumber)
                  .map((item, index) => (
                    <ProductCard
                      key={index}
                      item={item}
                      setShowSearchPopup={setShowSearchPopup}
                      searchWord={searchWord}
                    />
                  ))}
              </div>
              <div className="results" onClick={showallProductsPage}>
                <span>عرض نتائج البحث</span>
                <span className="number-product">{SearchProducts.length}</span>
              </div>
            </>
          ) : (
            <div className="search-not-found">
              <p>عفوا المنتج الذي تبحث عنه غير موجود</p>
              <p> يرجي البحث مرة أخري</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
