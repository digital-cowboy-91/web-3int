import { Poppins, Noto_Sans } from "next/font/google";
import { ReactNode } from "react";
import { CMSHomepage } from "./api/_cms/collections/homepage";
import Header from "./components/Header/Header";
import "./globals.css";
import Footer from "./components/Footer/Footer.v2";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});
// const noto = Noto_Sans({
//   subsets: ["latin"],
//   weight: ["400", "600", "700"],
// });

export async function generateMetadata() {
  const res = await CMSHomepage.readSingleton();

  return {
    title: {
      template: "%s · " + res.seo.title,
      default: res.seo.title,
    },
    description: res.seo.description,
    keywords: res.seo.keywords,
  };
}

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/media/139473a8-56f1-4fd9-bd09-80bc40a26aba/favicon.svg"
          sizes="any"
        />
      </head>
      <body className={`${poppins.className}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* {modal} */}
      </body>
    </html>
  );
}
