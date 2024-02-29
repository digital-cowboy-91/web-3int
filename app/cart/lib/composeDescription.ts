export default function composeDescription(
  format: string,
  quantity: number,
  downloadable: boolean,
  filament?: string
) {
  let sep = " · ";
  let qty = "qty " + quantity;

  if (downloadable) {
    return format + " digital file";
  }

  if (!filament) {
    return format + sep + qty;
  }

  return format + sep + filament + sep + qty;
}
