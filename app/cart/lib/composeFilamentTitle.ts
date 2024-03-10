import { TFilament } from "@/app/api/_cms/collections/filaments";

export function composeFilamentTitle(filament: TFilament | undefined) {
  let f = filament;
  if (!f) return "";
  return f.material + ", " + f.colour + " " + f.cosmetic;
}

export function retrieveFilamentTitle(
  list: TFilament[],
  id: string | undefined
) {
  let object = id ? list.find((f) => f.id === id) : list[0];

  return composeFilamentTitle(object);
}
