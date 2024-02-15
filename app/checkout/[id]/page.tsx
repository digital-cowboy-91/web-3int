import { CMS_Products } from "@/app/api/_cms/items/products";
import { CSSContainer } from "@/app/styles";
import { notFound } from "next/navigation";
import CheckoutForm from "./CheckoutForm";

const modalMode = false;

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Products.readItem(params.id);

  if (!res) notFound();

  return (
    <section id="checkout">
      <div className={`${CSSContainer} my-8 p-8 grid grid-cols-1 gap-4`}>
        <h2>Checkout</h2>
        {/* <div>{JSON.stringify(res)}</div> */}
        <CheckoutForm product={res} />
      </div>
    </section>
  );
}