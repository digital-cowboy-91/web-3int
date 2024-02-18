const base = process.env.CMS_HOST;
const draftToken = process.env.CMS_DRAFT_TOKEN;

type TResponse = {
  data: any;
  status: number;
  statusText: string;
};

export default async function cmsAPI(
  path: string,
  init: RequestInit,
  draftMode: boolean = false,
  addSecret: boolean = false
): Promise<TResponse> {
  try {
    const res = await fetch(
      base +
        path +
        (draftMode || addSecret ? `&access_token=${draftToken}` : ""),
      init
    );

    if (!res.ok) {
      throw new Error(
        `CMS API request failed with status ${res.status}: ${res.statusText}`
      );
    }

    let data = res.statusText === "No Content" ? {} : await res.json();

    return {
      data: data?.data || data,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (err) {
    console.log(`CMS API fetch failed: ${err}`);

    return {
      data: null,
      status: 500,
      statusText: "Internal Server Error",
    };
  }
}
