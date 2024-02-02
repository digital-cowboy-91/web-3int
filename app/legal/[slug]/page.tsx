import { CSSContainer } from "@/app/styles";

export default async function page({ params }: { params: { slug: string } }) {
  const URL = `${process.env.WEB_HOST}/api/legal/${params.slug}`;
  const res_v2 = await fetch(URL, {
    next: {
      tags: ["legal"],
    },
  }).then((res) => res.json());

  return (
    <section id="content" className="mt-8">
      <div
        className={`${CSSContainer} p-8`}
        dangerouslySetInnerHTML={{ __html: res_v2[0].content }}
      />
    </section>
  );
}
