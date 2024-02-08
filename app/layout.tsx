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
import PreviewBar from "./components/PreviewBar";

export const dynamic = "force-static";
export const revalidate = 86400;

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "3INT",
  description:
    "On-demand affordable 3D printing service from North-West UK. Whether you need a prototype for your new product, a custom-made toy for your child, or a replacement part for your favorite gadget, we can help. We create durable, long-lasting products that meet your exact specifications. Get a free quote today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();

  return (
    <html lang="en">
      <body className={`text-sm font-normal relative ${poppins.className}`}>
        {isEnabled && <PreviewBar />}
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
