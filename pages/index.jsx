import axios from "axios";
import Home from "./home";
import Head from "next/head";

export default function Index({ categoryList, productList }) {
  return (
    <>
      <Head>
        <title>Foodora</title>
        <meta name="description" content="Foodora fast food delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Home categoryList={categoryList} productList={productList} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const category = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

/*
Bu, uygulamanın ana root sayfası.
Home klasöründe ki index.jsx dosyasını çağırıyor.
Yani aslında ana sayfa içeriği pages/home/index.jsx içinde tanımlı

🧠 Zihin Haritası
Yer	                Açıklama
_document.js	      HTML iskeleti (SSR'de çalışır). <html>, <head>, <body> tanımlanır.
<Main />	          Sayfanın HTML içeriğini buraya enjekte eder.
<NextScript />	    Gerekli JS scriptlerini (React bundle vs.) yükler.
_app.js	            Tüm sayfalara ortak layout ve props yönetimi.
Component	      	  Geçerli sayfa bileşeni. Örn: pages/index.jsx gibi.
pageProps	          Sayfa özelinde gelen props.
*/