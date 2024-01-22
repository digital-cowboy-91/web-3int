import { cache } from "react";
import prisma from "./client";
import type { PriceTier } from "@prisma/client";

export type TPriceTier = PriceTier;

type TSuccess = {
  success: true;
  data: TPriceTier[];
};

type TError = {
  success: false;
  data: any;
};

export const FINDALL = cache(async (): Promise<TSuccess | TError> => {
  try {
    const data = await prisma.priceTier.findMany({
      orderBy: {
        position: "asc",
      },
    });

    return { success: true, data };
  } catch (e) {
    return { success: false, data: e };
  }
});
