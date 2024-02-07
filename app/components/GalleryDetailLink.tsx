"use client";

import Link from "next/link";
import { useStoreModal } from "../storeModal";
import { CSSLinkOutline } from "../styles";

const GalleryDetailLink = ({ id }: { id: string | number }) => {
  const hideModal = useStoreModal((s) => s.hide);
  return (
    <Link
      href={`?subject=${id}#contact`}
      className={CSSLinkOutline}
      onClick={hideModal}
    >
      Get Quote
    </Link>
  );
};

export default GalleryDetailLink;
