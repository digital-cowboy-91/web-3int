"use server";

export async function verifyCaptchaAction(token: string) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: "POST",
      cache: "no-store",
    }
  ).then((res) => res.json());

  if (res.score > 0.5) {
    return true;
  } else {
    return false;
  }
}
