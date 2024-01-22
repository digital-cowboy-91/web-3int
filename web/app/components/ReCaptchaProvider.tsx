"use client";

import { PropsWithChildren } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type Props = {
  siteKey: string;
  children: React.ReactNode;
};

const ReCaptchaProvider = ({ siteKey, children }: Props) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      container={{
        element: "recaptcha-wrapper",
        parameters: {},
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default ReCaptchaProvider;
