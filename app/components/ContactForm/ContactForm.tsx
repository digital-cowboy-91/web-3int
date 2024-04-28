"use client";

// TODO: Validation

import {
  SContactForm,
  TContactForm,
} from "@/app/api/_cms/collections/clientQueries";
import CMSClientQueriesCreateItem_server from "@/app/api/_cms/collections/clientQueries/createItem.server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnimate } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormProvider, useForm } from "react-hook-form";
import { verifyCaptchaAction } from "../../lib/verifyCaptchaAction";
import Form from "../Form";
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

      const res = await CMSClientQueriesCreateItem_server(data);

      if ("error" in res) {
        throw new Error(res.error.message);
      }

      setSubmitted(true);
    } catch (e) {
      console.error("ContactForm", e);
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
          className="min-w-[300px] max-w-[400px] grid grid-cols-1 gap-5"
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
          <Form.Textarea name="message" label="Message" disabled={disabled} />
          <div className="flex flex-row gap-8 justify-end">
            <button
              onClick={() => reset()}
              className="btn-underline-action"
              disabled={disabled}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn-outline-action"
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
