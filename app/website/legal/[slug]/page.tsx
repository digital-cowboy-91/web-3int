import { CMSLegal } from "@/app/api/_cms/collections/legal";
import { CSSContainer } from "@/app/styles";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res = await CMSLegal.readSlug(params.slug);

  if (!res) notFound();

  return {
    title: res.seo.title,
    description: res.seo.description,
    keywords: res.seo.keywords,
  };
}

export default async function page({ params }: { params: { slug: string } }) {
  const res = await CMSLegal.readSlug(params.slug);

  if (!res) notFound();

  return (
    <section id="page_content" className="mt-8">
      <div
        className={`${CSSContainer} p-8`}
        dangerouslySetInnerHTML={{ __html: res.content }}
      />
    </section>
  );
}
