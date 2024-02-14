import { CMS_Homepage } from "@/app/api/_cms/items/homepage";
import { Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import { ReactNode } from "react";
import Footer from "./components/Footer";
import SectionHero from "./components/Hero/SectionHero";
import Navbar from "./components/Navbar";
import PreviewBanner from "./components/PreviewBanner";
import ReCaptchaProvider from "./components/ReCaptchaProvider";
import "./globals.css";
import GSMProvider from "./lib/GSMProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export async function generateMetadata() {
  const res = await CMS_Homepage.readSingleton();

  return {
    title: res.web_title,
    description: res.web_description,
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
      <body className={`text-sm font-normal relative ${poppins.className}`}>
        {isEnabled && <PreviewBanner />}
        {/* <GSMProvider> */}
        <ReCaptchaProvider siteKey={process.env.RECAPTCHA_SITE_KEY!}>
          <Navbar />
          <SectionHero />
          <main>{children}</main>
          <Footer />
          {modal}
        </ReCaptchaProvider>
        {/* </GSMProvider> */}
      </body>
    </html>
  );
}
