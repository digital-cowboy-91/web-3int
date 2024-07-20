export default function composeDescription(
  format: string,
  quantity: number,
  is_digital: boolean,
  filament?: string
) {
  let sep = " · ";
  let qty = "qty " + quantity;

  if (is_digital) {
    return format + " digital file";
  }

  if (!filament) {
    return format + sep + qty;
  }

  return format + sep + filament + sep + qty;
}
