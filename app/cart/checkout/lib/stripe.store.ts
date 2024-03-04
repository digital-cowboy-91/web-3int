import { create } from "zustand";
import {
  createPaymentIntent,
  retrievePaymentIntent,
  updatePaymentIntent,
} from "./actionStripe";
import { useCartStore } from "../../components/Cart.store";
import { useShippingStore } from "../../components/ShippingItems";
import { TCartItemSimple } from "../../lib/revalidateCart";

type TStore = {
  clientSecret: string;
  isLoading: boolean;
  addressRequired: boolean;
  handleIntent: () => Promise<void>;
  // destroyIntent: () => Promise<void>
  _updatedAt: number;
};

export const useStripeStore = create<TStore>((set, get) => ({
  clientSecret: "",
  isLoading: false,
  addressRequired: false,
  handleIntent: async () => {
    const now = Date.now();
    let addressRequired = false;

    set({ isLoading: true });
    let { clientSecret } = get();
    let clientId = localStorage.getItem("stripe-session");

    const simpleCart: TCartItemSimple[] = useCartStore
      .getState()
      .cart?.map(({ pid, qty, fid, downloadable }) => {
        if (!downloadable && !addressRequired) addressRequired = true;

        return { pid, qty, fid };
      });

    if (simpleCart.length === 0) {
      set({ isLoading: false });
      return;
    }

    const shippingId = useShippingStore.getState().id;

    if (!shippingId) {
      set({ isLoading: false });
      return;
    }

    if (clientId && !clientSecret) {
      let res = await retrievePaymentIntent(clientId);

      if (res) clientSecret = res;
    }

    let cart, _cache;

    if (!clientSecret) {
      let res = await createPaymentIntent(simpleCart, shippingId);

      if (!res) {
        set({ isLoading: false });
        return;
      }

      cart = res.cart;
      _cache = res._cache;
      clientSecret = res.clientSecret;
      clientId = res.clientId;
    }

    if (clientSecret && clientId) {
      let res = await updatePaymentIntent(clientId, simpleCart, shippingId);

      if (!res) {
        set({ isLoading: false });
        return;
      }
      cart = res.cart;
      _cache = res._cache;
    }

    useCartStore.setState({ cart, _cache, _updatedAt: now });
    useShippingStore.setState({ _updatedAt: now });
    set({ clientSecret, addressRequired, isLoading: false, _updatedAt: now });
  },
  _updatedAt: 0,
}));
