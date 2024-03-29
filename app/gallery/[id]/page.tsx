import { CMSGallery } from "@/app/api/_cms/collections/gallery";
import ImageAsset from "@/app/components/ImageAsset";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import VideoAsset from "./VideoAsset";
import "./page.style.css";
import IconTimelapse from "@/app/components/icons/IconTimelapse";
import IconAnimation from "@/app/components/icons/IconAnimation";

// export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await CMSGallery.readItem(params.id);

  if (!res) notFound();

  return {
    title: res.seo.title,
    description: res.seo.description,
    keywords: res.seo.keywords,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMSGallery.readItem(params.id);

  if (!res) notFound();

  const {
    id,
    license: {
      claim_ownership,
      author_name,
      author_url,
      license_title,
      license_url,
      work_title,
      work_url,
    },
    title,
    media,
    attributes,
    buying_options,
  } = res;

  return (
    <section className="gallery-detail">
      <h1>{res.title}</h1>
      <div className="gallery-detail__media">
        <ImageAsset asset={media[0]?.asset} />
        {/* <div className="gallery-detail__media__bar"> */}
        <div className="gallery-detail__media__asset-list">
          {media?.map(({ asset: item }) => (
            <button key={item.id}>
              {item.type.includes("video") && item.tags != null ? (
                item.tags.includes("timelapse") ? (
                  <IconTimelapse fill="#000" stroke="#000" />
                ) : (
                  <IconAnimation fill="#000" stroke="#000" />
                )
              ) : (
                <ImageAsset
                  key={item.id}
                  asset={item}
                  preset="h720"
                  aria-label={`Show image ${item.title}`}
                />
              )}
            </button>
          ))}
        </div>
        <div className="gallery-detail__media__license">
          <Link
            href={claim_ownership ? "/gallery/" + id : (work_url as string)}
          >
            {claim_ownership ? title : work_title}
          </Link>{" "}
          by{" "}
          <Link href={claim_ownership ? "/" : (author_url as string)}>
            {claim_ownership ? "3INT UK" : author_name}
          </Link>
          {license_title && license_url && (
            <>
              <br />
              is licensed under{" "}
              <Link href={license_url as string}>{license_title}</Link>
            </>
          )}
        </div>
        {/* </div> */}
      </div>
      <div className="gallery-detail__content">
        <div className="gallery-detail__description">
          <h2>Description</h2>
          <p>TODO: Description</p>
        </div>
        <div className="gallery-detail__technical">
          <h2>Technical details</h2>
          <div className="gallery-detail__attributes">
            {attributes?.map((attr, index) => (
              <Fragment key={index}>
                <strong>{attr.name}</strong>
                <span>{attr.value}</span>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="gallery-detail__products">
          <h2>Shop & Download</h2>
          <p>TODO: Buying options</p>
        </div>
      </div>
    </section>
  );
}
