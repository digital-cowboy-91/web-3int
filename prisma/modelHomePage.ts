import { cache } from "react";
import prisma from "./client";
import type { HomePage } from "@prisma/client";

export type THomePage = HomePage;

type TSuccess = {
  success: true;
  data: THomePage[];
};

type TError = {
  success: false;
  data: any;
};

export const FINDALL = cache(async (): Promise<TSuccess | TError> => {
  try {
    const data = await prisma.homePage.findMany({
      orderBy: {
        position: "asc",
      },
    });

    return { success: true, data };
  } catch (e) {
    return { success: false, data: e };
  }
});
