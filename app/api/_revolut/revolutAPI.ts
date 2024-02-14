const BASE = process.env.REVOLUT_MERCHANT_HOST;
const SECRET = process.env.REVOLUT_MERCHANT_SECRET;

export default async function revolutAPI(path: string, init: RequestInit) {
  try {
    const res = await fetch(BASE + path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Revolut-Api-Version": "2023-09-01",
        Authorization: `Bearer ${SECRET}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Revolut API request failed with status ${res.status}: ${res.statusText}`
      );
    }

    let data = await res.json();

    return {
      data,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (err) {
    console.log(`Revolut API fetch failed: ${err}`);

    return {
      data: null,
      status: 500,
      statusText: "Internal Server Error",
    };
  }
}
