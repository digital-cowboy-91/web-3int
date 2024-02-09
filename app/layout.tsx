import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import Footer from "./components/Footer";
import SectionHero from "./components/Hero/SectionHero";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import ReCaptchaProvider from "./components/ReCaptchaProvider";
import "./globals.css";
import { draftMode } from "next/headers";
import PreviewBanner from "./components/PreviewBanner";
import { CMS_Homepage } from "@/cms/items/homepage";

export const dynamic = "force-static";
export const revalidate = 86400;

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
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <body className={`text-sm font-normal relative ${poppins.className}`}>
        {isEnabled && <PreviewBanner />}
        <ReCaptchaProvider siteKey={process.env.RECAPTCHA_SITE_KEY!}>
          <Navbar />
          <SectionHero />
          {/* <h1 className="text-4xl font-bold text-center">
            {new Date().getTime()}
          </h1> */}
          <main>{children}</main>
          <Footer />
          <Modal />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
