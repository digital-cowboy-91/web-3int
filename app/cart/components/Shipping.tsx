import { useCartStore } from "../lib/store";

export default function Shipping({ className }: { className?: string }) {
  const isLoading = useCartStore((s) => s.isLoading);

  const methods = useCartStore((s) => s.shipping_methods);
  const sid = useCartStore((s) => s.shipping_id);
  const updateId = useCartStore((s) => s.updateShippingId);

  if (isLoading) return <div>Loading...</div>;
  if (methods.length === 0) return <div>No shipping options available</div>;

  return (
    <div className={`space-y-4 ${className}`}>
      {methods.map(({ id, title, description, price }, index) => (
        <div key={id} className="grid grid-cols-[1.5rem_minmax(0,_1fr)]">
          <input
            className="size-4 my-auto"
            id={id.toString()}
            type="radio"
            name="shipping"
            onChange={(e) => {
              e.currentTarget.checked && updateId(id);
            }}
            defaultChecked={id === sid}
          />
          <label className="font-semibold" htmlFor={id.toString()}>
            {title} · {price ? "£ " + price : "Free"}
          </label>
          {description && (
            <span className="text-xs col-start-2">{description}</span>
          )}
        </div>
      ))}
    </div>
  );
}
