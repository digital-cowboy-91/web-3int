import type { ContactFormOption } from "@prisma/client";
import prisma from "./client";
import { cache } from "react";

export type TContactFormOption = ContactFormOption;

type TSuccess = {
  success: true;
  data: TContactFormOption[];
};

type TError = {
  success: false;
  data: any;
};

export const FINDALL = cache(async (): Promise<TSuccess | TError> => {
  try {
    const data = await prisma.contactFormOption.findMany({
      orderBy: {
        index: "asc",
      },
    });

    return { success: true, data: data };
  } catch (e) {
    return { success: false, data: e };
  }
});
