"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FormProvider, useForm } from "react-hook-form";
import {
  SContactForm,
  TContactForm,
} from "../api/_cms/collections/clientQueries";
import CMSClientQueriesCreateItem_server from "../api/_cms/collections/clientQueries/createItem.server";
import Action from "../components/Actions/Action";
import Form from "../components/UI/Form/Form";
import { verifyCaptchaAction } from "../lib/verifyCaptchaAction";
import Loader from "../components/Loader";

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [submitted, setSubmitted] = useState(false);

  const formMethods = useForm<TContactForm>({
    resolver: zodResolver(SContactForm),
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
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
    if (submitted) {
      reset();
      setSubmitted(false);
    }
  }, [submitted]);

  const disabled = isSubmitting || submitted;

  return (
    <FormProvider {...formMethods}>
      <Form
        onSubmit={onSubmit}
        className="content-wrapper w-[500px] mx-auto cart"
      >
        <h2>Contact form</h2>
        <div className="content-wrapper--l3">
          <Form.Input
            id="name"
            name="name"
            type="text"
            label="Name"
            disabled={disabled}
          />
          <Form.Input
            id="email"
            name="email"
            type="email"
            label="Email"
            disabled={disabled}
          />
          <Form.Input
            id="subject"
            name="subject"
            type="text"
            label="Subject"
            disabled={disabled}
          />
          <Form.Textarea
            id="message"
            name="message"
            type="text"
            label="Message"
            disabled={disabled}
            rows={5}
          />
        </div>
        <div className="flex justify-end">
          <Action
            as="button"
            type="submit"
            label={isSubmitting ? <Loader /> : "Send"}
            disabled={disabled}
          />
        </div>
      </Form>
    </FormProvider>
  );
}
