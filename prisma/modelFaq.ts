import type { Faq } from "@prisma/client";
import prisma from "./client";
import { cache } from "react";

export type TFAQ = Faq;

type TSuccess = {
  success: true;
  data: TFAQ[];
};

type TError = {
  success: false;
  data: any;
};

export const FINDALL = cache(async (): Promise<TSuccess | TError> => {
  try {
    const data = await prisma.faq.findMany();

    return { success: true, data };
  } catch (e) {
    return { success: false, data: e };
  }
});
