const NEXT_PUBLIC_WEB_HOST = process.env.NEXT_PUBLIC_WEB_HOST;

export default async function Page({ params }: { params: { id: string } }) {
  const url = `${NEXT_PUBLIC_WEB_HOST}/api/emails/orders/summary/${params.id}`;

  console.log(url);
  const res = await fetch(url, {
    method: "GET",
  });
  const html = await res.text();

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
