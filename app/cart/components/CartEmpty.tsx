import CartImage from "./CartImage";

export default function CartEmpty() {
  return (
    <div className="size-full min-h-[300px] flex flex-col justify-center items-center gap-8">
      {/* <img
        src="/media/429eb72d-57b8-4178-a77a-5261aae2393f?key=h320"
        className="h-[320px]"
      /> */}
      <CartImage />
      <span className="text-2xl font-semibold uppercase">Cart is empty</span>
    </div>
  );
}
