import { TGallery } from "@/app/api/_cms/collections/gallery";
import ImageAsset from "@/app/components/ImageAsset";
import SVGLogoChar from "@/app/components/Logo/SVGLogoChar";
import Link from "next/link";
// import "./GalleryItem.style.v3.css";
import "./GalleryItem.style.v4.css";

type TProps = {
  item: TGallery;
};

export default function GalleryItem({
  item: { id, title, cover_image, license },
}: TProps) {
  return (
    <Link href={`/gallery/${id}`} className="gallery-item">
      <ImageAsset asset={cover_image} preset="h250" />
      <div className="gallery-item__overlay">
        <div>
          <span>{title}</span>
        </div>
        {license.claim_ownership && <SVGLogoChar />}
      </div>
    </Link>
  );
}
