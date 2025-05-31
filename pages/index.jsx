import Home from "./home";

export default function Index() {
  return (
    <>
      <Home />
    </>
  );
}


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