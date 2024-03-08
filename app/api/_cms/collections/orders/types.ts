export type TOrderItems = {
  product_ref: string;
  filament_ref: number | undefined;
  description: string;
  quantity: number;
  discount: number;
  discount_pct: number;
  price_at_sale: number;
  amount: number;
};
export type TOrder = {
  payment_intent_id: string;
  items_ref: TOrderItems[];
  shipping_ref?: number;
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
