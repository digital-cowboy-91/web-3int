import CartImage, { TCartImageType } from "./CartImage";

type TProps = {
  type: TCartImageType;
  message: string;
};

export default function CartEmpty({ type, message }: TProps) {
  return (
    <div className="size-full min-h-[300px] flex flex-col justify-center items-center gap-8">
      <CartImage type={type} />
      <span className="text-2xl font-semibold uppercase">{message}</span>
    </div>
  );
}
