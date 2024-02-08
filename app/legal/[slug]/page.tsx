import { CSSContainer } from "@/app/styles";
import { CMS_Legal } from "@/cms/items/legal";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();

  let res;

  if (isEnabled) {
    res = await CMS_Legal.previewSlug(params.slug);
  } else {
    res = await CMS_Legal.readSlug(params.slug);
  }

  if (!res) {
    notFound();
  }

  return (
    <section id="content" className="mt-8">
      <div
        className={`${CSSContainer} p-8`}
        dangerouslySetInnerHTML={{ __html: res.content }}
      />
    </section>
  );
}
