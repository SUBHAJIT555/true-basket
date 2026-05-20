import store from "@/redux/store";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import ReactModal from "react-modal";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ProductModal = dynamic(
  () => import("@/components/common/product-modal"),
  { ssr: false }
);
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "swiper/css/bundle";
import "react-modal-video/scss/modal-video.scss";

import "../styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toast-overrides.scss";
// import { GoogleOAuthProvider } from "@react-oauth/google";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

// stripePromise
// const NEXT_PUBLIC_STRIPE_KEY = 'pk_test_51NYXCFGndYsQkAEFifIbJH64sZFMDpF7DcLYvUUN2az3VdK1M7qVPo7Z2j9rhunf3Pd0C3aFLENIxFriJWwx1P6a00lQFqaoc6';
// const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_KEY);
// const NEXT_PUBLIC_GOOGLE_CLIENT_ID = '375198830790-6lk26c7frudnqee2b55ge7fkbco1nkma.apps.googleusercontent.com'
export default function App({ Component, pageProps }) {
  return (
    // <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        {/* <Elements stripe={stripePromise}> */}
          <div
            id="root"
            className={`${GeistSans.variable} ${inter.variable} ${inter.className}`}
          >
            <Component {...pageProps} />
            <ProductModal />
          </div>
        {/* </Elements> */}
      </Provider>
    // </GoogleOAuthProvider>
  )
}
