// TODO [LOW]: Pagination

import { notFound } from "next/navigation";
import { CMSFAQ } from "../api/_cms/collections/faq";

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

export default async function page() {
  const res = await CMSFAQ.readItems();

  if (!res) notFound();

  return (
    <section id="page_content" className="mt-8 container">
      <h1>Frequently Asked Questions</h1>
      <ul>
        {res.map(({ id, answer, question }) => (
          <li key={id} id={id.toString()}>
            <h2>{question}</h2>
            <p>{answer}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
