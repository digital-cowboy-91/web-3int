import { Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import { ReactNode } from "react";
import Footer from "./components/Footer";
import SectionHero from "./components/Hero/SectionHero";
import Navbar from "./components/Navbar";
import PreviewBanner from "./components/PreviewBanner";
import ReCaptchaProvider from "./components/ReCaptchaProvider";
import "./globals.css";
import { CMSHomepage } from "./api/_cms/collections/homepage";

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
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <link
        rel="icon"
        href="/media/139473a8-56f1-4fd9-bd09-80bc40a26aba/favicon.svg"
        sizes="any"
      />
      <body className={`text-sm font-normal relative ${poppins.className}`}>
        {isEnabled && <PreviewBanner />}
        <ReCaptchaProvider siteKey={process.env.RECAPTCHA_SITE_KEY!}>
          <Navbar />
          <SectionHero />
          <main>{children}</main>
          <Footer />
          {modal}
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
