import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
// internal
import Menus from './header-com/menus';
import logo from '@assets/img/logo/logo.svg';
import useSticky from '@/hooks/use-sticky';
import useCartInfo from '@/hooks/use-cart-info';
import { openCartMini } from '@/redux/features/cartSlice';
import { handleProductModal } from '@/redux/features/productModalSlice';
import { useGetAllProductsQuery } from '@/redux/features/productApi';
import HeaderTopRight from './header-com/header-top-right';
import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
import { CartTwo, Menu, Search, WishlistTwo } from '@/svg';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';
import OffCanvas from '@/components/common/off-canvas';

const MAX_SEARCH_RESULTS = 10;

const HeaderTwo = ({ style_2 = false }) => {
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchWrapperRef = useRef(null);
  const { setSearchText, handleSubmit, searchText } = useSearchFormSubmit();
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  const { data: productsData } = useGetAllProductsQuery();

  const searchResults = useMemo(() => {
    const products = productsData?.data ?? [];
    const term = (searchText || '').trim().toLowerCase();
    if (term.length < 2) return [];
    return products
      .filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(term)) ||
          (p.description && p.description.toLowerCase().includes(term))
      )
      .slice(0, MAX_SEARCH_RESULTS);
  }, [searchText, productsData]);

  const showDropdown = showSearchDropdown && searchText.trim().length >= 2;

  // Position dropdown below search input (for portal; use fixed so it's not clipped)
  const updateDropdownPosition = () => {
    if (searchWrapperRef.current) {
      const rect = searchWrapperRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  useLayoutEffect(() => {
    if (showDropdown) updateDropdownPosition();
  }, [showDropdown]);

  useEffect(() => {
    if (showDropdown) {
      const onScrollOrResize = () => updateDropdownPosition();
      window.addEventListener('scroll', onScrollOrResize, true);
      window.addEventListener('resize', onScrollOrResize);
      return () => {
        window.removeEventListener('scroll', onScrollOrResize, true);
        window.removeEventListener('resize', onScrollOrResize);
      };
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        const dropdown = document.querySelector('.tp-header-search-dropdown');
        if (dropdown && dropdown.contains(e.target)) return;
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSearchInputChange = (e) => {
    setSearchText(e.target.value);
    setShowSearchDropdown(true);
  };

  const onProductSelect = (product) => {
    dispatch(handleProductModal(product));
    setSearchText('');
    setShowSearchDropdown(false);
  };

  return (
    <>
      <header>
        <div className={`tp-header-area tp-header-style-${style_2 ? 'primary' : 'darkRed'} tp-header-height`}>
          <div id="header-sticky" className={`tp-header-bottom-2 tp-header-sticky ${sticky ? 'header-sticky' : ''}`}>
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-5 col-md-5 col-sm-4 col-6">
                    <div className="logo">
                      <Link href="/">
                        <Image src={logo} alt="logo" priority />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-5 d-none d-xl-block">
                    <div className="main-menu menu-style-2">
                      <nav className="tp-main-menu-content">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-7 col-md-7 col-sm-8 col-6">
                    <div className="tp-header-bottom-right d-flex align-items-center justify-content-end pl-30">
                      <div className="tp-header-search-2 d-none d-sm-block p-relative" ref={searchWrapperRef}>
                        <form onSubmit={handleSubmit}>
                          <input
                            onChange={onSearchInputChange}
                            onFocus={() => searchText.trim().length >= 2 && setShowSearchDropdown(true)}
                            value={searchText}
                            type="text"
                            placeholder="Search for Products..."
                            autoComplete="off"
                          />
                          <button type="submit">
                            <Search />
                          </button>
                        </form>
                        {/* Dropdown is portaled to body so it's never clipped by header overflow */}
                        {showDropdown &&
                          typeof document !== 'undefined' &&
                          createPortal(
                            <div
                              className="tp-header-search-dropdown"
                              role="listbox"
                              style={{
                                position: 'fixed',
                                top: dropdownPosition.top,
                                left: dropdownPosition.left,
                                width: dropdownPosition.width,
                                minHeight: '48px',
                                background: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                border: '1px solid #eee',
                                maxHeight: '360px',
                                overflowY: 'auto',
                                zIndex: 99999,
                              }}
                            >
                              {searchResults.length === 0 ? (
                                <div style={{ padding: '14px 16px', color: '#666', fontSize: '14px' }}>
                                  No products found
                                </div>
                              ) : (
                                <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}>
                                  {searchResults.map((product) => {
                                    const price = product.discountedPrice ?? product.price;
                                    const hasDiscount = product.discountedPrice != null && product.discountedPrice < product.price;
                                    return (
                                      <li key={product._id}>
                                        <button
                                          type="button"
                                          onClick={() => onProductSelect(product)}
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '10px 16px',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            fontSize: '14px',
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#f5f5f5';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                          }}
                                          className="tp-header-search-result-item"
                                        >
                                          <span style={{ flexShrink: 0, width: 48, height: 48, marginRight: 12, position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                                            <Image
                                              src={product.img || '/assets/img/product/product-1.jpg'}
                                              alt={product.title}
                                              width={48}
                                              height={48}
                                              style={{ objectFit: 'cover' }}
                                            />
                                          </span>
                                          <span style={{ flex: 1, minWidth: 0 }}>
                                            <span style={{ display: 'block', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                              {product.title}
                                            </span>
                                            <span style={{ display: 'block', color: '#666', fontSize: '13px' }}>
                                              ₹{typeof price === 'number' ? price.toFixed(2) : price}
                                              {hasDiscount && (
                                                <span style={{ marginLeft: 6, textDecoration: 'line-through', color: '#999' }}>
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
                            </div>,
                            document.body
                          )}
                      </div>
                      <div className="tp-header-action d-flex align-items-center ml-30">
                        <div className="tp-header-action-item">
                          <Link href="/wishlist" className="tp-header-action-btn">
                            <WishlistTwo />
                            {wishlist?.length > 0 && (
                              <span className="tp-header-action-badge">
                                {wishlist.length}
                              </span>
                            )}
                          </Link>
                        </div>
                        <div className="tp-header-action-item">
                          <button onClick={() => dispatch(openCartMini())} className="tp-header-action-btn cartmini-open-btn" >
                            <CartTwo />
                            <span className="tp-header-action-badge">{quantity}</span>
                          </button>
                        </div>
                        <div className="tp-header-action-item tp-header-hamburger mr-20 d-xl-none">
                          <button onClick={() => setIsCanvasOpen(true)} type="button" className="tp-offcanvas-open-btn">
                            <Menu />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} categoryType="fashion" />
      {/* off canvas end */}
    </>
  );
};

export default HeaderTwo;