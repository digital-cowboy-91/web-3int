export type TOrderItems = {
  product_ref: string;
  filament_ref: string | undefined;
  description: string;
  quantity: number;
  discount: number;
  discount_pct: number;
  price_at_sale: number;
  amount: number;
};
export type TOrder = {
  payment_intent_id: string;
  item_refs: TOrderItems[];
  shipping_ref?: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export type TDigital = {
  product_ref: {
    asset: {
      id: string;
      filename_download: string;
    };
  };
  payment_state: number;
};
