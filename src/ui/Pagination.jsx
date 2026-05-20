
import { useEffect, useMemo } from "react";

const Pagination = ({
  items = [],
  countOfPage = 12,
  paginatedData, // optional: when omitted, parent derives slice from currPage (avoids extra re-renders)
  currPage,
  setCurrPage,
}) => {
  const pageStart = (currPage - 1) * countOfPage;
  const totalPages = Math.ceil(items.length / countOfPage);

  // Only sync via callback when parent uses legacy paginatedData; otherwise parent derives from currPage
  useEffect(() => {
    if (typeof paginatedData === "function") {
      paginatedData(items, pageStart, countOfPage);
    }
  }, [items, pageStart, countOfPage, paginatedData]);

  // Generate page numbers with ellipsis (inlined in useMemo for correct deps)
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currPage <= 3) {
        for (let i = 2; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currPage >= totalPages - 2) {
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push('...');
        for (let i = currPage - 1; i <= currPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  }, [totalPages, currPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currPage) {
      return;
    }
    setCurrPage(page);
    window.scrollTo(0, 0);
    if (typeof paginatedData === "function") {
      const newPageStart = (page - 1) * countOfPage;
      paginatedData(items, newPageStart, countOfPage);
    }
  };

  return (
    <>
      {/* <!-- Products Pagination Start --> */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-15">
          <div className="rounded p-2">
            <ul className="d-flex align-items-center list-unstyled mb-0">
              <li>
                <button
                  onClick={() => handlePageChange(currPage - 1)}
                  aria-label="button for pagination previous"
                  type="button"
                  disabled={currPage === 1}
                  className={`d-flex align-items-center justify-content-center pagination-nav-btn ${
                    currPage === 1 ? "disabled" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </li>

              {pageNumbers.map((page, index) => (
                <li key={index} className="mx-1">
                  {page === '...' ? (
                    <span className="pagination-ellipsis d-flex align-items-center justify-content-center">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`pagination-page-btn d-flex align-items-center justify-content-center ${
                        currPage === page ? "active" : ""
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}

              <li>
                <button
                  onClick={() => handlePageChange(currPage + 1)}
                  aria-label="button for pagination next"
                  type="button"
                  disabled={currPage === totalPages}
                  className={`d-flex align-items-center justify-content-center pagination-nav-btn ${
                    currPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* <!-- Products Pagination End --> */}
    </>
  );
};

export default Pagination;
