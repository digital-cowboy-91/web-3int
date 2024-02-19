"use client";

import { TProduct } from "@/app/api/_cms/items/products";
import Form from "@/app/components/Form";
import { verifyCaptchaAction } from "@/app/lib/verifyCaptchaAction";
import { CSSButtonOutline } from "@/app/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import RevolutCheckout from "@revolut/checkout";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormProvider, set, useForm } from "react-hook-form";
import { z } from "zod";
import actionCreateOrder from "./actionCreateOrder";

const SProduct_min = z.object({
  pid: z.string(),
  description: z.string(),
  total: z.coerce.number().positive(),
});

const SProduct_full = SProduct_min.extend({
  quantity: z.coerce.number().min(1),
  colour: z.string().min(1).max(30),
});

const SShippingAddress = z.object({
  street_line_1: z.string().min(1).max(50),
  street_line_2: z.string().max(50).optional(),
  city: z.string().min(3).max(58),
  postcode: z.string().regex(/^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i),
});

const SConsent = z.object({
  privacy: z.boolean().refine((val) => val === true, {
    message: "Please read and accept the privacy policy",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Please read and accept the terms and conditions",
  }),
  marketing: z.boolean(),
});

const SCustomer_min = z.object({
  forename: z.string().min(1).max(50),
  surname: z.string().min(1).max(50),
  email: z.string().email(),
  email_confirm: z.string().email(),
  consent: SConsent,
});

const SCustomer_full = SCustomer_min.extend({
  shipping_address: SShippingAddress,
});

const SCheckout_min = z.object({
  product_details: SProduct_min,
  customer_details: SCustomer_min,
});

const SCheckout_full = z.object({
  product_details: SProduct_full,
  customer_details: SCustomer_full,
  note: z.string().optional(),
});

export type TCheckout_min = z.infer<typeof SCheckout_min>;
export type TCheckout_full = z.infer<typeof SCheckout_full>;

export default function CheckoutForm({
  product,
}: {
  product: TProduct;
  modalMode?: boolean;
}) {
  const { id, gallery_rel, title, price, downloadable, colours, discounts } =
    product;

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);

  const formMethods = useForm<TCheckout_min | TCheckout_full>({
    resolver: zodResolver(downloadable ? SCheckout_min : SCheckout_full),
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

      const RC = await RevolutCheckout(rc_token, "sandbox");

      RC.payWithPopup({
        onSuccess() {
          console.log("Payment successful");
          setSubmitted(true);
        },
        onError() {
          console.log("Payment failed");
          throw new Error("Payment failed");
        },
      });
    } catch (e) {
      console.log("CheckoutForm", e);
    }
  });

  useEffect(() => {
    setValue("product_details.pid", id);
    setValue("product_details.description", gallery_rel.title + ", " + title);
    setValue("product_details.quantity", 1);
    setValue("product_details.colour", colours[0]);
  }, []);

  const watchQuantity = watch("product_details.quantity");

  useEffect(() => {
    function getDiscountCoef() {
      let sorted = discounts.sort(
        (first, last) => last.quantity - first.quantity
      );
      let match =
        sorted.find((d) => watchQuantity >= d.quantity)?.percentage || 0;

      return (100 - match) / 100;
    }

    setValue(
      "product_details.total",
      watchQuantity * price * getDiscountCoef()
    );
  }, [watchQuantity]);

  const disabled = isSubmitting || submitted;

  return (
    <>
      {submitted && (
        <div
          id="success_banner"
          className="bg-success p-4 rounded-md shadow-md text-dark block"
          aria-hidden={!submitted}
        >
          <h3>Thank you for you payment!</h3>
          <p className="mt-3">
            It's currently being processed. Once your payment is confirmed, you
            will receive en email with your download link. This should not take
            more than 5 minutes from now. If you haven't received any email
            within 1 hour, feel free to contact us for assistance. We're here to
            help!
          </p>
        </div>
      )}
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
                name="product_details.description"
                label="Description"
                disabled={true}
                className={`col-span-2 ${
                  downloadable ? "md:col-span-3" : "md:col-span-2"
                }`}
              />
              {!downloadable && (
                <Form.Select
                  name="product_details.colour"
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
                name="product_details.quantity"
                label="Quantity"
                disabled={downloadable || disabled}
              />
              <Form.Input
                type="text"
                name="product_details.total"
                label="Total £ inc. TAX"
                disabled={true}
                className="col-span-2 md:col-span-1"
              />
            </div>
            <h3>Customer details</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Form.Input
                type="text"
                name="customer_details.forename"
                label="Forname"
                autocomplete="given-name"
                disabled={disabled}
              />
              <Form.Input
                type="text"
                name="customer_details.surname"
                label="Surname"
                autocomplete="family-name"
                disabled={disabled}
              />
              <Form.Input
                type="text"
                name="customer_details.email"
                label="Email"
                autocomplete="email"
                disabled={disabled}
              />
              <Form.Input
                type="text"
                name="customer_details.email_confirm"
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
                    name="customer_details.shipping_address.street_line_1"
                    label="Street line 1"
                    autocomplete="address-line1"
                    disabled={disabled}
                    className="col-span-2"
                  />
                  <Form.Input
                    type="text"
                    name="customer_details.shipping_address.street_line_2"
                    label="Street line 2"
                    autocomplete="address-line2"
                    disabled={disabled}
                    className="col-span-2"
                  />
                  <Form.Input
                    type="text"
                    name="customer_details.shipping_address.city"
                    label="City"
                    autocomplete="address-level2"
                    disabled={disabled}
                  />
                  <Form.Input
                    type="text"
                    name="customer_details.shipping_address.postcode"
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
                name="customer_details.consent.privacy"
                label="I've read the Privacy Policy and I agree with it"
                disabled={disabled}
                className="block"
              />
              <Form.Checkbox
                name="customer_details.consent.terms"
                label="I've read the Terms and Conditions and I agree with it"
                disabled={disabled}
                className="block"
              />
              <Form.Checkbox
                name="customer_details.consent.marketing"
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
