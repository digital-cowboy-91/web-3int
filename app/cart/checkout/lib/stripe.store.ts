import { create } from "zustand";
import actionStripeUpdatePaymentIntent, {
  actionStripeCreatePaymentIntent,
  actionStripeRetrievePaymentIntent,
} from "./actionStripe";
import { useCartStore } from "../../components/Cart.store";
import { useShippindStore } from "../../components/ShippingItems";
import { TCartItemSimple } from "../../lib/revalidateCart";

type TStore = {
  clientSecret: string;
  isLoading: boolean;
  dynamicRoute: string;
  handleIntent: () => Promise<void>;
  // destroyIntent: () => Promise<void>
  _updatedAt: number;
};

export const useStripeStore = create<TStore>((set, get) => ({
  clientSecret: "",
  isLoading: false,
  dynamicRoute: "",
  handleIntent: async () => {
    function terminate(message: string) {
      console.log(message);
      set({ isLoading: false });
    }

    const now = Date.now();

    set({ isLoading: true });
    let { clientSecret } = get();
    let clientId = localStorage.getItem("stripe-session");

    // Check cart existence
    const simpleCart: TCartItemSimple[] = useCartStore
      .getState()
      .cart?.map(({ pid, qty, fid }) => ({
        pid,
        qty,
        fid,
      }));

    if (simpleCart.length === 0) return terminate("Cart is empty");

    // Check shipping existence
    const shippingId = useShippindStore.getState().id;

    if (!shippingId) return terminate("No shipping selected");

    // Retrieve payment intent
    if (clientId) {
      let res = await actionStripeRetrievePaymentIntent(clientId);

      if (res) clientSecret = res;
    }

    // Create payment intent
    if (!clientSecret) {
      let res = await actionStripeCreatePaymentIntent(simpleCart, shippingId);

      if (!res) return terminate("No payment intent created");

      useCartStore.setState({
        cart: res.cart,
        _cache: res._cache,
        _updatedAt: now,
      });

      clientSecret = res.clientSecret;
      clientId = res.clientId;
    }

    // Update payment intent
    if (clientSecret && clientId) {
      let res = await actionStripeUpdatePaymentIntent(
        clientId,
        simpleCart,
        shippingId
      );

      if (!res) return terminate("No payment intent updated");

      useCartStore.setState({
        cart: res.cart,
        _cache: res._cache,
        _updatedAt: now,
      });
    }

    set({ clientSecret, isLoading: false, _updatedAt: now });
  },
  _updatedAt: 0,
}));
