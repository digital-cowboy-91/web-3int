import { CSSContainer } from "../styles";
import Cart from "./components/Cart";

export default function Page() {
  return (
    <section id="gallery-detail">
      <div className={`${CSSContainer} my-8`}>
        <h1 className="text-3xl font-bold mb-8">Cart</h1>
        <Cart />
      </div>
    </section>
  );
}
