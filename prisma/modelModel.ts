import type { Model } from "@prisma/client";
import prisma from "./client";
import { cache } from "react";

export type TModel = Model;

type TSuccess = {
  success: true;
  data: TModel[];
};

type TError = {
  success: false;
  data: any;
};

export const FINDALL = cache(async (): Promise<TSuccess | TError> => {
  try {
    const data = await prisma.model.findMany({
      include: {
        media: {
          include: {
            thumbnail: true,
          },
        },
      },
    });

    // console.log(JSON.stringify(data));

    return { success: true, data: data };
  } catch (e) {
    return { success: false, data: e };
  }
});
