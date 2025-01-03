// TODO [MEDIUM]: Create modal version

import { CMSGallery } from "@/app/api/_cms/collections/gallery";
import ImageAsset from "@/app/components/ImageAsset";
import IconAnimation from "@/app/components/icons/IconAnimation";
import IconTimelapse from "@/app/components/icons/IconTimelapse";
import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "./Media";
import ShopAndDownloadForm from "./ShopAndDownloadForm";
import Tab from "./Tabs/Tab";
import TabPanel from "./Tabs/TabPanel";
import "./GalleryDetail.style.css";

export default async function GalleryDetail({
  modelId,
  compactMode = false,
}: {
  modelId: string;
  compactMode?: boolean;
}) {
  const res = await CMSGallery.readItem(modelId);

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
    article,
  } = res;

  return (
    <div className="gallery-detail" data-compact-mode={compactMode}>
      <h1>{res.title}</h1>
      <div className="shadow-wrapper">
        <div className="gallery-detail__media">
          <div className="gallery-detail__media__asset-list">
            {media?.map(({ asset: item }) => (
              <Link
                key={item.id}
                href={{ query: { asset: item.id } }}
                replace={true}
              >
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
              </Link>
            ))}
          </div>
          <Media assets={media.map((i) => i.asset)} />
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
        </div>
        <div className="gallery-detail__tab-menu">
          <Tab panelId="description" defaultActive={true}>
            Description
          </Tab>
          <Tab panelId="technical">Technical</Tab>
          {buying_options?.length > 0 && (
            <Tab panelId="products" className="md:hidden">
              Shop & Download
            </Tab>
          )}
        </div>
      </div>

      <div className="gallery-detail__tab-content">
        <TabPanel
          id="description"
          className="gallery-detail__description"
          dangerouslySetInnerHTML={{ __html: article }}
        />

        <TabPanel id="technical" className="gallery-detail__technical">
          <ul className="gallery-detail__attributes">
            {attributes?.map((attr, index) => (
              <li key={index}>
                <strong>{attr.name}</strong>
                <span>{attr.value}</span>
              </li>
            ))}
          </ul>
        </TabPanel>
        {buying_options?.length > 0 && (
          <TabPanel id="products" className="gallery-detail__products">
            <h2>Shop & Download</h2>
            <ShopAndDownloadForm products={buying_options} />
          </TabPanel>
        )}
      </div>
    </div>
  );
}
