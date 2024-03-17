import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import { CMSHomepage } from "./api/_cms/collections/homepage";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

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
      <link
        rel="icon"
        href="/media/139473a8-56f1-4fd9-bd09-80bc40a26aba/favicon.svg"
        sizes="any"
      />
      <body className={poppins.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
