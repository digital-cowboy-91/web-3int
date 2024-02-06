const base = process.env.CMS_HOST;

export default async function cmsAPI(path: string, init: RequestInit) {
  try {
    const res = await fetch(base + path, init);

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
