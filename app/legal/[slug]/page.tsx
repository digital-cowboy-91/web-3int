import ButtonExitPreview from "@/app/components/ButtonExitPreview";
import { CSSContainer } from "@/app/styles";
import { CMS_Legal } from "@/cms/items/legal";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();

  let res = await CMS_Legal.readBySlug(params.slug, isEnabled);

  if (!res.length) {
    notFound();
  }

  return (
    <section id="content" className="mt-8">
      {isEnabled && (
        <div className="text-center p-5">
          <ButtonExitPreview />
        </div>
      )}
      <div
        className={`${CSSContainer} p-8`}
        dangerouslySetInnerHTML={{ __html: res[0].content }}
      />
    </section>
  );
}
