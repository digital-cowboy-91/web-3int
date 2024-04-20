import { useSearchParams } from "next/navigation";

export default function useSuperSearchParams() {
  const params = useSearchParams();

  function updateQueryWith(key: string, value: string) {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(key, value);

    return newParams.toString();
  }

  function queryContains(key: string, value: string) {
    return params.get(key) ? params.get(key) === value : undefined;
  }

  return { updateQueryWith, queryContains };
}
