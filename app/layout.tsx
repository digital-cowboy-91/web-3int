import { Poppins } from "next/font/google";
import { draftMode } from "next/headers";
import { ReactNode } from "react";
import PreviewBanner from "./website/components/PreviewBanner";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({ children }: { children: ReactNode }) {
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
        {children}
      </body>
    </html>
  );
}
