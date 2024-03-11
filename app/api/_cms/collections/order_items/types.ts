import { UUID } from "crypto";

export type TOrderItem = {
  order_ref: string;
  product_ref: string;
  filament_ref: string | undefined;
  description: string;
  quantity: number;
  discount: number;
  discount_pct: number;
  price_at_sale: number;
  amount: number;
};

export type TOrderItemDownload = {
  order_ref: {
    id: UUID;
    payment_status: string;
  };
  product_ref: {
    asset: {
      id: UUID;
      filename_download: string;
    };
  };
};
