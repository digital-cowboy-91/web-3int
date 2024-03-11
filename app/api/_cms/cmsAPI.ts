const base = process.env.CMS_HOST;
const draftToken = process.env.CMS_DRAFT_TOKEN;

type TResponse = {
  data: any;
  status: number;
  statusText: string;
};

type TArgs = {
  path: string;
  id?: string | number;
  params?: string[];
  draftMode?: boolean;
  addSecret?: boolean;
  fetchInit: RequestInit;
};

export default async function cmsAPI({
  path,
  id,
  params = [],
  draftMode = false,
  addSecret = false,
  fetchInit,
}: TArgs): Promise<TResponse> {
  try {
    // Add token to params
    if (addSecret || draftMode) params.push(`access_token=${draftToken}`);
    // Compose API URL
    const url =
      base +
      path +
      (id ? `/${id}` : "") +
      (params.length ? `?${params.join("&")}` : "");
    // Call API
    const res = await fetch(url, fetchInit);
    // Check for errors
    if (!res.ok) {
      throw new Error(`[cms_API] Status ${res.status}: ${res.statusText}`);
    }
    // Parse response
    let data = res.statusText === "No Content" ? {} : await res.json();

    return {
      data: data?.data || data,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (err: any) {
    console.error(err.message);
    throw new Error(err.message);
  }
}
