"use client";
import { ToastContainer } from "react-toastify";
import NoProduct from "../Utilities/NoProduct/NoProduct";
import FilterComp from "../Utilities/FilterComp/FilterComp";
import FilterAndSortBar from "../Utilities/FilterAndSortBar/FilterAndSortBar";
import CategoryProductCard from "./CategoryAtoms/CategoryProductCard/CategoryProductCard";
import "./CategoryProducts.css";
import { Container, Row } from "react-bootstrap";
import LoadingPage from "../Utilities/LoadingPage/LoadingPage";
import CategoryHooks from "@/app/customHooks/CategoryHooks/CategoryHooks";
export default function CategoryProducts({ categoryID, subCategoryID }) {
  const [
    loading,
    products,
    grid,
    setGrid,
    filter,
    setFilter,
    selectedSort,
    setSelectedSort,
    productSectionRef,
    showApplyAndDeleteBtn,
    setShowApplyAndDeleteBtn,
    CategoryProductsRes,
    setQueryStringfromFilter,
    onDeleteFilter,
    productsPerPage,
  ] = CategoryHooks(categoryID, subCategoryID);
  return (
    <>
      {products != null ? (
        <section className="category-container">
          <FilterAndSortBar
            grid={grid}
            setGrid={setGrid}
            filter={filter}
            setFilter={setFilter}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setShowApplyAndDeleteBtn={setShowApplyAndDeleteBtn}
          />
          {products && (
            <>
              <Container fluid>
                <div
                  className="filter-and-products-container"
                  ref={productSectionRef}
                >
                  <FilterComp
                    filter={filter}
                    setFilter={setFilter}
                    showApplyAndDeleteBtn={showApplyAndDeleteBtn}
                    setShowApplyAndDeleteBtn={setShowApplyAndDeleteBtn}
                    products={CategoryProductsRes?.data}
                    setQueryStringfromFilter={setQueryStringfromFilter}
                    onDeleteFilter={onDeleteFilter}
                  />
                  {products.length > 0 ? (
                    <Row style={{ flexDirection: "row-reverse" }}>
                      {products.map((product) => (
                        <CategoryProductCard
                          product={product}
                          grid={grid}
                          key={product.ProductID}
                        />
                      ))}
                    </Row>
                  ) : (
                    <NoProduct text="لا توجد منتجات في هذا القسم حاليا" />
                  )}
                </div>
              </Container>
              {loading == true && productsPerPage >= products.length && (
                <div className="loader-container">
                  <p className="loader">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 21.214 37.041"
                    >
                      <g id="Frada" transform="translate(-204.754 -843.606)">
                        <g
                          id="FRADA_icon"
                          data-name="FRADA icon"
                          transform="translate(204.754 843.606)"
                        >
                          <path
                            id="Path_25"
                            data-name="Path 25"
                            d="M90.038,4.04,96.689,0l14.564,8.166v8.25l-7.156,3.62-.252-7.913Z"
                            transform="translate(-90.038 0.001)"
                            fill="#000"
                          />
                          <path
                            id="Path_26"
                            data-name="Path 26"
                            d="M90.038,45.4l20.709,11.954L104.1,61.56l-14.059-8.5Z"
                            transform="translate(-90.038 -33.022)"
                            fill="#000"
                          />
                          <path
                            id="Path_27"
                            data-name="Path 27"
                            d="M90.038,93.467l7.1-4.206V97.34l-7.1,4.63Z"
                            transform="translate(-90.038 -64.929)"
                            fill="#000"
                          />
                        </g>
                      </g>
                    </svg>
                  </p>
                </div>
              )}
            </>
          )}
          <ToastContainer />
        </section>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
