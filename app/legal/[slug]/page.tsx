import { CSSContainer } from "@/app/styles";
import { FINDSLUG, GETLEGALMENULINKS } from "@/prisma/modelPage";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// export async function generateStaticParams() {
//   const res = await GETLEGALMENULINKS();

//   if (!res.success) return null;

//   return res.data.map(({ slug }) => slug);
// }

export default async function page({ params }: { params: { slug: string } }) {
  const res = await FINDSLUG(params.slug);

  if (!res.success) return null;

  const decodedContent = atob(res.data.content);

  return (
    <section id="content" className="mt-8">
      {/* <h1 className="text-4xl font-bold text-center">{new Date().getTime()}</h1> */}
      <div className={`${CSSContainer} p-8`}>
        <Markdown remarkPlugins={[remarkGfm]}>{decodedContent}</Markdown>
      </div>
    </section>
  );
}
