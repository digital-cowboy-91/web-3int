import { CMSPage } from "@/app/api/_cms/collections/pages";
import { notFound } from "next/navigation";
import DynamicComponent from "./components/DynamicComponent";

// export const dynamic = "force-static";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const res = await CMSLegal.readSlug(params.slug);

//   if (!res) notFound();

//   return {
//     title: res.seo.title,
//     description: res.seo.description,
//     keywords: res.seo.keywords,
//   };
// }

export default async function page({
  params,
}: {
  params: { slugs: string[] };
}) {
  const path = "/" + params.slugs.join("/");
  const res = await CMSPage.readItem(path);

  // console.log({ slugs: params.slugs, path, res });

  if (!res) notFound();

  const { title, components } = res;

  return (
    <div className="container g__px-xs" style={{ maxWidth: "680px" }}>
      {components.map(({ collection: componentName, item: props }, index) => {
        return (
          <DynamicComponent
            key={`${path}_${componentName}_${index}`}
            componentName={componentName}
            props={{ title, ...props }}
          />
        );
      })}
    </div>
  );

  return;
}
