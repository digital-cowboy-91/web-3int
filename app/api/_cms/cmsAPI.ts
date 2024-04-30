const base = process.env.CMS_DOCKER_URL;
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
  responseAsIs?: boolean;
};

export default async function cmsAPI({
  path,
  id,
  params = [],
  draftMode = false,
  addSecret = false,
  fetchInit,
  responseAsIs = false,
}: TArgs): Promise<TResponse> {
  try {
    // Add token to params
    if (addSecret || draftMode) {
      fetchInit.headers = {
        ...fetchInit.headers,
        Authorization: `Bearer ${draftToken}`,
      };
    }

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
    let data;

    if (responseAsIs) {
      data = res;
    } else {
      let json = res.statusText === "No Content" ? {} : await res.json();
      data = json?.data || json;
    }
    // Return
    return {
      data,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
}
