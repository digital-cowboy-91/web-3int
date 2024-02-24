import { CMS_Products } from "@/app/api/_cms/items/products";
import { CSSContainer } from "@/app/styles";
import { notFound } from "next/navigation";
import CheckoutStripeElementsWrapper from "./CheckoutStripeElementsWrapper";
import actionCheckoutStripePaymentIntent from "./actionCheckoutStripePaymentIntent";

const pub_key = process.env.STRIPE_PUBLIC_KEY!;

export default async function Page({ params }: { params: { id: string } }) {
  const res = await CMS_Products.readItem(params.id);

  if (!res) notFound();

  const clientSecret = await actionCheckoutStripePaymentIntent(res);

  if (!clientSecret) notFound();

  return (
    <section id="checkout">
      <div className={`${CSSContainer} my-8 p-8 grid grid-cols-1 gap-4`}>
        <CheckoutStripeElementsWrapper
          clientSecret={clientSecret}
          pub_key={pub_key}
        />
      </div>
    </section>
  );
}
