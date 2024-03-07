import { TFilament } from "@/app/api/_cms/types/filaments";

export function composeFilamentTitle({
  filament: f,
}: {
  filament: TFilament | undefined;
}) {
  if (!f) return "";
  return f.material + ", " + f.colour + " " + f.cosmetic;
}

export function retrieveFilamentTitle(
  list: TFilament[],
  id: number | undefined
) {
  let object = id ? list.find((f) => f.id === id) : list[0];

  return composeFilamentTitle({ filament: object });
}
