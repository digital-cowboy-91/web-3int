import { useSearchParams } from "next/navigation";

export type TStatusParam = "success" | "error" | "empty";

export default function useStatusParam() {
  const params = useSearchParams();

  const status = params.get("status") as TStatusParam | null;
  const message = params.get("msg") as string | null;

  return { status, message };
}
