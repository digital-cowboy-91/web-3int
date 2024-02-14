import { CSSContainer } from "@/app/styles";
import { CMS_Legal } from "@/app/api/_cms/items/legal";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { slug: string } }) {
  const res = await CMS_Legal.readSlug(params.slug);

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
