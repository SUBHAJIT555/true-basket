import SEO from "@/components/seo";
import { seoDescriptions } from "@/data/seo-descriptions";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import TrueBasketHero from "@/components/banner/true-basket-hero";
import JewelryShopBanner from "@/components/shop-banner/jewelry-shop-banner";
import JewelryAbout from "@/components/about/jewelry-about";
import PopularProducts from "@/components/products/jewelry/popular-products";
import ProductArea from "@/components/products/jewelry/product-area";
import BestSellerPrd from "@/components/products/jewelry/best-seller-prd";
import JewelryBrands from "@/components/brand/jewelry-brands";
import InstagramAreaFour from "@/components/instagram/instagram-area-4";
import FeatureAreaThree from "@/components/features/feature-area-3";
import FooterTwo from "@/layout/footers/footer-2";
import HeaderTwo from "@/layout/headers/header-2";
import HeaderThree from "@/layout/headers/header-3";
import Header from "@/layout/headers/header";

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" description={seoDescriptions.home} />
      {/* <Header/> */}
      <HeaderThree />
      {/* <HeaderTwo/>  */}
      {/* <HeaderFour/> */}
      <TrueBasketHero />
      <FeatureAreaThree />
      <PopularProducts />
      {/* <JewelryShopBanner /> */}
      <JewelryAbout />

      <ProductArea />
      {/* JewelryCollectionBanner - hidden per request */}
      {/* <JewelryCollectionBanner /> */}
      <BestSellerPrd />
      {/* <JewelryBrands/> */}
      {/* <InstagramAreaFour/> */}
      <FooterTwo />
    </Wrapper>
  );
}
