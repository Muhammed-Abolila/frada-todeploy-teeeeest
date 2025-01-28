"use client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import FixedFooter from "../../components/Utilities/FixedFooter/FixedFooter";
import WhatsApp from "../../components/Utilities/whatsApp/WhatsApp";
import { Provider } from "react-redux";
import { Cairo } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Store } from "./Redux/Store";
import "../../public/icons/style.css";
import { usePathname, useRouter } from "next/navigation";
const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["arabic"],
});

export default function RootLayout({ children }) {
  const pathName = usePathname();
  return (
    <html lang="ar">
      <head>
        <title>Frada version 900</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="title" content="FRADA | فرادا" />
        <meta
          name="description"
          content="استعد للتميّز والأناقة مع فرادا - وجهتك الأساسية لأزياء الرجال السعودية. اكتشف تشكيلتنا الاستثنائية من الزي السعودي التقليدي، الأحذية الرسمية، العطور، والإكسسوارات. احصل على إطلالة لا تنسى وأضف لمستك الشخصية مع منتجاتنا ذات الجودة العالية والفخامة. استمتع بتجربة تسوق مثيرة وتألق بثقة مع فرادا"
        />
        <meta name="keywords" content="frada, shoes , نعال , شماغ" />
        <meta name="robots" content="index, follow" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {/* <script
          defer
          src={`https://www.googletagmanager.com/gtag/js?id=G-HFPRGPRSHW`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HFPRGPRSHW', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}
        {/* Snap Pixel Code */}
        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
                {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
                r.src=n;var u=t.getElementsByTagName(s)[0];
                u.parentNode.insertBefore(r,u);})(window,document,
                'https://sc-static.net/scevent.min.js');
                snaptr('init', '9a5c407d-fbb2-4de4-8f75-f660a1c59809', {});`,
          }}
        /> */}

        {/* Meta Pixel Code */}
        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            !(function(f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function() {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '768152088611221');
            fbq('track', 'PageView');`,
          }}
        /> */}
        {/* End Meta Pixel Code */}
      </head>
      <body className={cairo.className} suppressHydrationWarning={true}>
        <Provider store={Store}>
          {/* Conditionally render Header, Footer, and FixedFooter based on pathname */}
          {!pathName?.includes("dashboard") ? <Header /> : null}

          {children}

          <WhatsApp />

          {!pathName?.includes("dashboard") ? <Footer /> : null}
          {!pathName?.includes("dashboard") ? <FixedFooter /> : null}
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
