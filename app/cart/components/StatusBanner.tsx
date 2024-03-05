"use client";

import useStatusParam, { TStatusParam } from "../lib/useStatusParam";
import CartEmpty from "./CartEmpty";
import MessageBanner, { TMsgType } from "./MessageBanner";

const messages = {
  success:
    "Thank you for your order! Keep an eye on your email for confirmation.",
  error:
    "Something went wrong, please try again. If the problem persists, contact support.",
};

export default function StatusBanner() {
  const { status, message } = useStatusParam();

  if (status === "success" || status === "error") {
    return <MessageBanner type={status} text={message || messages[status]} />;
  }

  return null;
}
