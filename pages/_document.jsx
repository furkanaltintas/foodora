import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/*
Bu dosya sadece ilk HTML yüklenmesi sırasında çalışır.
Sayfanın HTML yapısını (<html>, <body>, <head>) özelleştirmek için kullanılır.
Burada runtime'da <title> değiştirilmez. Yani dinamik değil.
Özetle: Fontlar, favicon, script preload vs. buraya yazılır.


🔁 Akış (Rendering Flow):
Kullanıcı '/' adresine gelir.
pages/index.jsx çalışır → pages/home/index.jsx içindeki component'lar render edilir.
<title> olarak _app.js'deki <Head> içindeki "Foodora" başlığı görünür.
_document.js sayesinde fontlar, favicon gibi statik başlık içerikleri yüklenir.
Tüm sayfa Layout bileşeni içine sarılır (layout/Layout.js).



pages/_document.js → SSR için özel HTML şablonu

<Main /> nedir?
Bu tag, uygulamanın sayfa içeriğinin yerleştirildiği yerdir.
Yani pages/index.jsx, pages/about.jsx vs. gibi sayfaların JSX çıktısı burada render edilir.
SSR (Server-Side Rendering) sırasında bu içerik sunucudan HTML olarak gelir ve burada gösterilir.

<NextScript /> nedir?
Bu tag, sayfanın çalışması için gerekli JavaScript dosyalarını (bundle, hydration script'leri) yerleştirir.
React'ın client tarafında çalışması için gereken script'ler buradan yüklenir.
*/
