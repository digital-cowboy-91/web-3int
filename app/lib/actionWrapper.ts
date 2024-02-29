"use server";

import SuperJSON from "superjson";

export default async function actionWrapper(fn: any) {
  let res = await fn();

  if (!res) {
    throw new Error("CMS_Action: No response");
  }

  return res;
}
