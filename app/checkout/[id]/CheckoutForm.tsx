"use client";

import { TProduct } from "@/app/api/_cms/items/products";
import Form from "@/app/components/Form";
import { verifyCaptchaAction } from "@/app/lib/verifyCaptchaAction";
import { CSSButtonOutline } from "@/app/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormProvider, set, useForm } from "react-hook-form";
import { z } from "zod";
import actionCreateOrder from "./actionCreateOrder";
import RevolutCheckout from "@revolut/checkout";
import { useRouter } from "next/navigation";

const SCheckoutForm = z.object({
  description: z.string(),
  quantity: z.number().min(1),
  total: z.number(),
  email: z.string().email(),
  delivery_email: z.boolean(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Please read and accept the privacy policy",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Please read and accept the terms and conditions",
  }),
  marketing: z.boolean().optional(),
});

export type TCheckoutForm = z.infer<typeof SCheckoutForm> & {
  pid: string;
  price: number;
};

export default function CheckoutForm({
  product,
  modalMode = false,
}: {
  product: TProduct;
  modalMode?: boolean;
}) {
  const { id, gallery_rel, title, price, downloadable } = product;

  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);
  const formMethods = useForm<TCheckoutForm>({
    resolver: zodResolver(SCheckoutForm),
  });
  const {
    handleSubmit,
    setValue,
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

      data.pid = id;
      data.price = price;

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
    setValue(
      "description",
      `${gallery_rel.title} - ${title}${downloadable ? " file" : ""}`
    );
    setValue("quantity", 1);
    setValue("total", 1 * price);
    setValue("delivery_email", true);
  }, []);

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
            className="grid grid-col-1 gap-8"
          >
            <h3>Purchase details</h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-8 md:grid-cols-5 md:grid-rows-1">
              <Form.Input
                type="text"
                name="description"
                label="Description"
                disabled={true}
                className="col-span-2 md:col-span-3"
              />
              <Form.Input
                type="number"
                name="quantity"
                label="Quantity"
                disabled={downloadable || disabled}
              />
              <Form.Input
                type="text"
                name="total"
                label="Total £"
                disabled={true}
              />
            </div>
            <h3>Customer details</h3>
            <Form.Input
              type="text"
              name="email"
              label="Email"
              autocomplete="email"
              disabled={disabled}
            />
            <h3>Delivery</h3>
            <Form.Checkbox
              name="delivery_email"
              label="To email address"
              disabled={true}
              className="block"
            />
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
