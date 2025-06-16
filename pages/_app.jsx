import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "nprogress/nprogress.css";
import "@/styles/globals.css";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import Layout from "@/layout/Layout";
import store from "@/redux/store";
import Router from "next/router";
import NProgress from "nprogress";


// Optional: Customize NProgress Settings
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <div className="pt-[88px]">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            ></ToastContainer>
            <Component {...pageProps} />
          </div>
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

/*
Burası tüm sayfalarda ortak olarak çalışan dosyadır.
<title> ve <meta> tag'lerini burada belirlediğin için, her sayfa bu varsayılan title'ı kullanır.
Eğer herhangi bir sayfada özel title belirlemezsen, bu title geçerli olur.

🔹 Component nedir?
Bu, Next.js tarafından otomatik olarak verilen bir prop’tur.
Her sayfa (index.jsx, about.jsx, contact.jsx...) bir React component’tir.
Kullanıcı hangi route’a giderse, o route’a ait sayfa component’i bu Component değişkenine atanır.

🔹 pageProps nedir?
Sayfanın getServerSideProps, getStaticProps, getInitialProps gibi metodlarla gönderdiği props'ları içerir.
*/
