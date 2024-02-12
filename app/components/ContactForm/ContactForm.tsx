"use client";

import { CSSButtonLink, CSSButtonOutline } from "@/app/styles";
import { verifyCaptchaAction } from "@/app/lib/verifyCaptchaAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnimate } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../Form";
import submitAction from "./submitAction";
import { SContactForm, TContactForm } from "@/cms/items/clientQueries";
import { TOption } from "./ContactFormWrapper";

export const ContactForm = ({ options }: { options: TOption[] }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [scope, animate] = useAnimate();
  const [submitted, setSubmitted] = useState(false);
  const params = useSearchParams();
  const formMethods = useForm<TContactForm>({
    resolver: zodResolver(SContactForm),
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!executeRecaptcha) {
        throw new Error("Recaptcha not initialized");
      }
      const token = await executeRecaptcha("contact_form");
      const verified = await verifyCaptchaAction(token);

      if (!verified) {
        throw new Error("Captcha verification failed");
      }

      const res = await submitAction(data);

      if (res != "success") {
        throw new Error(res as string);
      }

      setSubmitted(true);
    } catch (e) {
      console.log("ContactForm", e);
    }
  });

  useEffect(() => {
    const subject = params.get("subject");
    if (subject) {
      setValue("subject", subject || "");
    }
  }, [params]);

  useEffect(() => {
    if (submitted) {
      const startAnimation = async () => {
        await animate(
          "form",
          {
            opacity: 0,
          },
          {
            opacity: { duration: 0.3 },
            ease: "easeInOut",
          }
        );
        reset();
        await animate(
          "#success",
          {
            opacity: 1,
          },
          {
            opacity: { delay: 0.3, duration: 0.3 },
            ease: "easeInOut",
          }
        );
        await animate(
          "#success",
          {
            opacity: 0,
          },
          {
            delay: 5,
            opacity: { delay: 5.5, duration: 0.3 },
            ease: "easeInOut",
          }
        );
        await animate(
          "form",
          {
            opacity: 1,
          },
          {
            opacity: { delay: 0.5, duration: 0.3 },
            ease: "easeInOut",
          }
        );

        setSubmitted(false);
      };

      startAnimation();
    }
  }, [submitted]);

  const disabled = isSubmitting || submitted;

  return (
    <FormProvider {...formMethods}>
      <div ref={scope} className="relative">
        <div
          id="success"
          className="absolute w-full text-center opacity-0 top-1/2 transform -translate-y-1/2"
          aria-hidden={!submitted}
        >
          <h2>Thank you!</h2>
          <p className="ms-0">We'll be in touch soon</p>
        </div>
        <Form
          onSubmit={onSubmit}
          className="min-w-[300px] max-w-[400px]"
          ariaHidden={submitted}
        >
          <Form.Input
            type="text"
            name="name"
            label="Name"
            autocomplete="name"
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
            name="subject"
            label="Subject"
            disabled={disabled}
          />
          {/* <Form.Select
            name="subject"
            label="Subject"
            options={options}
            disabled={disabled}
          /> */}
          <Form.Textarea name="message" label="Message" disabled={disabled} />
          <div className="my-auto flex flex-row gap-8 justify-end">
            <button
              onClick={() => reset()}
              className={CSSButtonLink}
              disabled={disabled}
            >
              Reset
            </button>
            <button
              type="submit"
              className={CSSButtonOutline}
              disabled={disabled}
            >
              Send
            </button>
          </div>
        </Form>
      </div>
    </FormProvider>
  );
};
