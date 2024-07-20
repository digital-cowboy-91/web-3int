import { TGallery } from "@/app/api/_cms/collections/gallery";
import ImageAsset from "@/app/components/ImageAsset";
import SVGLogoChar from "@/app/components/Logo/SVGLogoChar";
import Link from "next/link";
import "./GalleryItem.style.v5.css";

type TProps = {
  item: TGallery;
};

export default function GalleryItem({
  item: { id, title, cover_image, license },
}: TProps) {
  return (
    <Link href={`/store/${id}`} className="gallery-item">
      <div>
        <ImageAsset asset={cover_image} preset="h250" />
      </div>
      <div className="gallery-item__overlay">
        <div>
          <span>{title}</span>
        </div>
        {license.claim_ownership && <SVGLogoChar />}
      </div>
    </Link>
  );
}
