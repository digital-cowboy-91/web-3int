import { cache } from "react";
import prisma from "./client";
import type { Page } from "@prisma/client";

export type TPage = Page;
export type TLegalMenuLinks = TPage & {
  description: undefined;
  content: undefined;
};

type TSuccess<T> = {
  success: true;
  data: T;
};

type TError = {
  success: false;
  data: any;
};

export const FINDALL = cache(async (): Promise<TSuccess<TPage[]> | TError> => {
  try {
    const data = await prisma.page.findMany();

    return { success: true, data };
  } catch (e) {
    return { success: false, data: e };
  }
});

export const FINDSLUG = cache(
  async (slug: string): Promise<TSuccess<TPage> | TError> => {
    try {
      const data = await prisma.page.findUnique({
        where: {
          slug,
        },
      });

      return { success: true, data };
    } catch (e) {
      return { success: false, data: e };
    }
  }
);

export const GETLEGALMENULINKS = cache(
  async (): Promise<TSuccess<TLegalMenuLinks[]> | TError> => {
    try {
      const data = await prisma.page.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
        },
      });

      return { success: true, data };
    } catch (e) {
      return { success: false, data: e };
    }
  }
);
