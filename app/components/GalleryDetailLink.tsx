"use client";

import Link from "next/link";
import { useStoreModal } from "../storeModal";
import { CSSLinkOutline } from "../styles";

const GalleryDetailLink = ({ title }: { title: string }) => {
  const hideModal = useStoreModal((s) => s.hide);
  return (
    <Link
      href={`?subject=About: ${title}#contact`}
      className={CSSLinkOutline}
      onClick={hideModal}
    >
      Ask About
    </Link>
  );
};

export default GalleryDetailLink;
