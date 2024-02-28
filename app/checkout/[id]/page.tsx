import { CMS_Products } from "@/app/api/_cms/items/store/products";
import { CSSContainer } from "@/app/styles";
import { AddressElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { notFound } from "next/navigation";
import actionCheckoutStripePaymentIntent from "./actionCheckoutStripePaymentIntent";

const pub_key = process.env.STRIPE_PUBLIC_KEY!;
const stripe = loadStripe(pub_key);

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <section id="checkout">
      <div className={`${CSSContainer} my-8 p-8 grid grid-cols-1 gap-4`}>
        <Elements
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
          stripe={stripe}
        >
          <AddressElement options={{ mode: "shipping" }} />
        </Elements>
      </div>
    </section>
  );
}
