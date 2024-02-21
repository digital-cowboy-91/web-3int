"use client";

import { TProduct } from "@/app/api/_cms/items/products";
import getDiscountCoef from "@/app/api/_cms/lib/getDiscountCoef";
import Form from "@/app/components/Form";
import { verifyCaptchaAction } from "@/app/lib/verifyCaptchaAction";
import { CSSButtonOutline } from "@/app/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import RevolutCheckout, { Mode } from "@revolut/checkout";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormProvider, useForm } from "react-hook-form";
import actionCreateOrder from "./actionCreateOrder";
import { SCheckout, TCheckout } from "./lib/schema";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ product }: { product: TProduct }) {
  const { id, gallery_rel, title, price, downloadable, colours, discounts } =
    product;

  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);

  const formMethods = useForm<TCheckout>({
    resolver: zodResolver(SCheckout),
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!executeRecaptcha) {
        throw new Error("Recaptcha not initialized");
      }
      const token = await executeRecaptcha("checkout_form");
      const verified = await verifyCaptchaAction(token);

      if (!verified) throw new Error("Captcha verification failed");

      const { id: rc_id, token: rc_token } = await actionCreateOrder(data).then(
        (res) => JSON.parse(res)
      );

      if (!rc_token) throw new Error("Revolut token not received");

      const RC = await RevolutCheckout(
        rc_token,
        process.env.REVOLUT_MERCHANT_MODE as Mode
      );

      RC.payWithPopup({
        onSuccess() {
          console.log("Payment successful");
          setSubmitted(true);
          router.push("/checkout/success");
        },
        onError() {
          console.log("Payment failed");
          throw new Error("Payment failed");
        },
      });
    } catch (e) {
      console.log("Checkout form:", e);
      alert("Checkout form: " + e);
    }
  });

  useEffect(() => {
    setValue("product_id", id);
    setValue("description", gallery_rel.title + ", " + title);
    setValue("quantity", 1);
    setValue("colour", downloadable ? undefined : colours[0]);
  }, []);

  const watchQuantity = watch("quantity");

  useEffect(() => {
    if (downloadable) {
      setValue("amount", price);
      return;
    }
    setValue(
      "amount",
      Math.round(
        watchQuantity * price * getDiscountCoef(discounts, watchQuantity) * 100
      ) / 100
    );
  }, [watchQuantity]);

  const disabled = isSubmitting || submitted;

  return (
    <>
      <FormProvider {...formMethods}>
        <div className="bg-white p-8 rounded-md shadow-md">
          <Form
            onSubmit={onSubmit}
            ariaHidden={submitted}
            className="grid gap-8"
          >
            <h3>Purchase details</h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-8 md:grid-cols-5 md:grid-rows-1">
              <Form.Input
                type="text"
                name="description"
                label="Description"
                disabled={true}
                className={`col-span-2 ${
                  downloadable ? "md:col-span-3" : "md:col-span-2"
                }`}
              />
              {!downloadable && (
                <Form.Select
                  name="colour"
                  label="Colour"
                  disabled={disabled || colours.length === 1}
                  options={colours.map((c) => ({
                    value: c,
                    option: c,
                  }))}
                />
              )}
              <Form.Input
                type="number"
                name="quantity"
                label="Quantity"
                disabled={downloadable || disabled}
              />
              <Form.Input
                type="text"
                name="amount"
                label="Total £ inc. TAX"
                disabled={true}
                className="col-span-2 md:col-span-1"
              />
            </div>
            <h3>Customer details</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Form.Input
                type="text"
                name="forename"
                label="Forname"
                autocomplete="given-name"
                disabled={disabled}
              />
              <Form.Input
                type="text"
                name="surname"
                label="Surname"
                autocomplete="family-name"
                disabled={disabled}
              />
              <Form.Input
                type="text"
                name="email"
                label="Email"
                autocomplete="email"
                disabled={disabled}
              />
              <Form.Input
                type="text"
                name="email_confirm"
                label="Confirm email"
                disabled={disabled}
              />
            </div>
            {!downloadable && (
              <>
                <h3>Shipping address</h3>
                <div className="grid grid-cols-2 gap-8">
                  <Form.Input
                    type="text"
                    name="shipping_address.street_line_1"
                    label="Street line 1"
                    autocomplete="address-line1"
                    disabled={disabled}
                    className="col-span-2"
                  />
                  <Form.Input
                    type="text"
                    name="shipping_address.street_line_2"
                    label="Street line 2"
                    autocomplete="address-line2"
                    disabled={disabled}
                    className="col-span-2"
                  />
                  <Form.Input
                    type="text"
                    name="shipping_address.city"
                    label="City"
                    autocomplete="address-level2"
                    disabled={disabled}
                  />
                  <Form.Input
                    type="text"
                    name="shipping_address.postcode"
                    label="Postcode"
                    autocomplete="postal-code"
                    disabled={disabled}
                  />
                </div>
                <h3>Order note</h3>
                <Form.Input
                  type="text"
                  name="note"
                  label="Note"
                  disabled={disabled}
                />
              </>
            )}
            <h3>Consent</h3>
            <div className="grid grid-cols-1 gap-2">
              <Form.Checkbox
                name="privacy"
                label="I've read the Privacy Policy and I agree with it"
                disabled={disabled}
                className="block"
              />
              <Form.Checkbox
                name="terms"
                label="I've read the Terms and Conditions and I agree with it"
                disabled={disabled}
                className="block"
              />
              <Form.Checkbox
                name="marketing"
                label="I'm interested in receiving occasional marketings and promotional emails"
                disabled={disabled}
                className="block"
              />
            </div>
            <div className="ms-auto">
              <button
                type="submit"
                className={CSSButtonOutline + " bg-success"}
                disabled={disabled}
              >
                Buy
              </button>
            </div>
          </Form>
        </div>
      </FormProvider>
    </>
  );
}
