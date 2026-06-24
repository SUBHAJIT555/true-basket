import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// internal
import TrueBasketLogo from "@/components/brand/true-basket-logo";
import { CartTwo, Menu, Search, WishlistTwo } from '@/svg';
import Menus from './header-com/menus';
import useSticky from '@/hooks/use-sticky';
import SearchBar from './header-com/search-bar';
import OffCanvas from '@/components/common/off-canvas';
import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
import useCartInfo from '@/hooks/use-cart-info';
import { openCartMini } from '@/redux/features/cartSlice';

const HeaderThree = () => {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  // Use solid header on shop (and other light-background pages) so logo and nav are visible
  const isSolidHeader = router.pathname === '/shop' || sticky;
  const headerClass = `tp-header-area tp-header-style-transparent-white tp-header-sticky has-dark-logo tp-header-height ${sticky ? 'header-sticky' : ''} ${isSolidHeader ? 'tp-header-solid' : 'tp-header-transparent'}`;
  return (
    <>
      <header>
        <div id="header-sticky" className={headerClass}>
          <div className="tp-header-bottom-3 pl-35 pr-35">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="logo">
                    <Link href="/">
                      <TrueBasketLogo variant="light" className="logo-light" />
                      <TrueBasketLogo variant="dark" className="logo-dark" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-3 p-relative d-flex align-items-center justify-content-center">
                    <nav className="tp-main-menu-content">
                      <Menus />
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button onClick={() => setIsSearchOpen(true)} type="button" className="tp-header-action-btn tp-search-open-btn">
                        <Search />
                      </button>
                    </div>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <Link href="/wishlist" className="tp-header-action-btn">
                        <WishlistTwo />
                        {wishlist?.length > 0 && (
                          <span className="tp-header-action-badge">{wishlist.length}</span>
                        )}
                      </Link>
                    </div>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button onClick={() => dispatch(openCartMini())} type="button" className="tp-header-action-btn cartmini-open-btn">
                        <CartTwo />
                        <span className="tp-header-action-badge">{quantity}</span>
                      </button>
                    </div>
                    <div className="tp-header-action-item d-lg-none">
                      <button onClick={() => setIsCanvasOpen(true)} type="button" className="tp-header-action-btn tp-offcanvas-open-btn">
                        <Menu />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search bar start */}
      <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {/* search bar end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsCanvasOpen={setIsCanvasOpen} categoryType="beauty" />
      {/* off canvas end */}
    </>
  );
};

export default HeaderThree;