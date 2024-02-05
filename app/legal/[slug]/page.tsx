import { CSSContainer } from "@/app/styles";
import { getLegalBySlug } from "@/cms/items/legal";

export default async function page({ params }: { params: { slug: string } }) {
  const res = await getLegalBySlug(params.slug);

  return (
    <section id="content" className="mt-8">
      <div
        className={`${CSSContainer} p-8`}
        dangerouslySetInnerHTML={{ __html: res[0].content }}
      />
    </section>
  );
}
