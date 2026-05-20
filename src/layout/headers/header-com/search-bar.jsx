import React, { useMemo } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { handleProductModal } from "@/redux/features/productModalSlice";

const MAX_SEARCH_RESULTS = 10;

const SearchBar = ({ isSearchOpen, setIsSearchOpen }) => {
  const dispatch = useDispatch();
  const { setSearchText, setCategory, handleSubmit, searchText } =
    useSearchFormSubmit();
  const { data: productsData } = useGetAllProductsQuery(undefined, {
    skip: !isSearchOpen,
  });

  const searchResults = useMemo(() => {
    const products = productsData?.data ?? [];
    const term = (searchText || "").trim().toLowerCase();
    if (term.length < 2) return [];
    return products
      .filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(term)) ||
          (p.description && p.description.toLowerCase().includes(term))
      )
      .slice(0, MAX_SEARCH_RESULTS);
  }, [searchText, productsData]);

  const handleCategory = (value) => {
    setCategory(value);
  };

  const onProductSelect = (product) => {
    dispatch(handleProductModal(product));
    setSearchText("");
    setIsSearchOpen(false);
  };

  const categories = ["mobile accessories", "smart gadgets", "computer accesseroies", "books", "stationery", "men's wear", "women's wear", "kids's wear", "fashion accessories"];

  return (
    <>
      <section
        className={`tp-search-area tp-search-style-brown ${
          isSearchOpen ? "opened" : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-search-form">
                <div
                  onClick={() => setIsSearchOpen(false)}
                  className="tp-search-close text-center mb-20"
                >
                  <button className="tp-search-close-btn tp-search-close-btn"></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="tp-search-input mb-10">
                    <input
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                      type="text"
                      placeholder="Search for product..."
                      autoComplete="off"
                    />
                    <button type="submit">
                      <i className="flaticon-search-1"></i>
                    </button>
                  </div>
                  {/* Live search results list */}
                  {searchText.trim().length >= 2 && (
                    <div
                      className="tp-search-results-list mb-15"
                      style={{
                        maxHeight: "320px",
                        overflowY: "auto",
                        background: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #eee",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      }}
                    >
                      {searchResults.length === 0 ? (
                        <div
                          style={{
                            padding: "14px 16px",
                            color: "#666",
                            fontSize: "14px",
                          }}
                        >
                          No products found
                        </div>
                      ) : (
                        <ul
                          style={{
                            listStyle: "none",
                            margin: 0,
                            padding: "8px 0",
                          }}
                        >
                          {searchResults.map((product) => {
                            const price =
                              product.discountedPrice ?? product.price;
                            const hasDiscount =
                              product.discountedPrice != null &&
                              product.discountedPrice < product.price;
                            return (
                              <li key={product._id}>
                                <button
                                  type="button"
                                  onClick={() => onProductSelect(product)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    padding: "10px 16px",
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "14px",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#f5f5f5";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                  className="tp-search-result-item"
                                >
                                  <span
                                    style={{
                                      flexShrink: 0,
                                      width: 48,
                                      height: 48,
                                      marginRight: 12,
                                      position: "relative",
                                      overflow: "hidden",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    <Image
                                      src={
                                        product.img ||
                                        "/assets/img/product/product-1.jpg"
                                      }
                                      alt={product.title}
                                      width={48}
                                      height={48}
                                      style={{ objectFit: "cover" }}
                                    />
                                  </span>
                                  <span style={{ flex: 1, minWidth: 0 }}>
                                    <span
                                      style={{
                                        display: "block",
                                        fontWeight: 500,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {product.title}
                                    </span>
                                    <span
                                      style={{
                                        display: "block",
                                        color: "#666",
                                        fontSize: "13px",
                                      }}
                                    >
                                      ₹
                                      {typeof price === "number"
                                        ? price.toFixed(2)
                                        : price}
                                      {hasDiscount && (
                                        <span
                                          style={{
                                            marginLeft: 6,
                                            textDecoration: "line-through",
                                            color: "#999",
                                          }}
                                        >
                                          ₹{product.price?.toFixed(2)}
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                  <div className="tp-search-category">
                    <span>Search by : </span>
                    {categories.map((c, i) => (
                      <a
                        key={i}
                        onClick={() => handleCategory(c)}
                        className="cursor-pointer"
                      >
                        {c}
                        {i < categories.length - 1 && ", "}
                      </a>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* body overlay */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className={`body-overlay ${isSearchOpen ? "opened" : ""}`}
      ></div>
    </>
  );
};

export default SearchBar;
