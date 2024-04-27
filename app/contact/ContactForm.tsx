"use client";

import { FormProvider, useForm } from "react-hook-form";
import Form from "../components/UI/Form/Form";
import Action from "../components/Actions/Action";

export default function ContactForm() {
  const formMethods = useForm();
  const { unregister, watch, getValues, handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...formMethods}>
      <Form
        onSubmit={onSubmit}
        className="content-wrapper w-[500px] mx-auto cart"
      >
        <h2>Contact form</h2>
        <div className="content-wrapper--l3">
          <Form.Input id="name" name="name" type="text" label="Name" />
          <Form.Input id="email" name="email" type="email" label="Email" />
          <Form.Input id="subject" name="subject" type="text" label="Subject" />
          <Form.Textarea
            id="message"
            name="message"
            type="text"
            label="Message"
          />
        </div>
        <div className="flex justify-end">
          <Action as="button" type="submit" label="Send" />
        </div>
      </Form>
    </FormProvider>
  );
}
