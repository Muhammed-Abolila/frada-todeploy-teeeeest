import Pagination from "react-bootstrap/Pagination";
import "./PaginationComp.css"
export default function PaginationComp({setCurrentPage,currentPage,totalPages}){
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    window.scrollTo(0,0)
  }
    return(
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Pagination
                className="pagnition-product"
              >
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ opacity: currentPage == 1 ? ".4" : "1" }}
                  prev
                >
                  السابق
                </Pagination.Prev>
                {Array.from({ length: totalPages }, (_, index) => (
                  <>
                  <Pagination.Item
                    key={index + 1}
                    active={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>               
                  </>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{ opacity: currentPage === totalPages ? ".4" : "1" }}
                  next
                >
                  التالي
                </Pagination.Next>
              </Pagination>
            </div>
    )
}