import { CSSContainer } from "@/app/styles";
import { FINDSLUG } from "@/prisma/modelPage";

export default async function page({ params }: { params: { slug: string } }) {
  const res = await FINDSLUG(params.slug);

  const URL = `${process.env.WEB_HOST}/api/legals/${params.slug}`;
  const res_v2 = await fetch(URL).then((res) => res.json());

  if (!res.success) return null;

  const decodedContent = atob(res.data.content);

  return (
    <section id="content" className="mt-8">
      <div
        className={`${CSSContainer} p-8`}
        dangerouslySetInnerHTML={{ __html: res_v2[0].content }}
      />
    </section>
  );
}
