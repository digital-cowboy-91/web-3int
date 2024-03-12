import { UUID } from "crypto";

export type TEmailSent = {
  order_ref?: UUID;
  client_query_ref?: UUID;
  type: string;
};
