"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type Props = {
  siteKey: string;
  children: React.ReactNode;
};

const ReCaptchaProvider = ({ siteKey, children }: Props) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default ReCaptchaProvider;
