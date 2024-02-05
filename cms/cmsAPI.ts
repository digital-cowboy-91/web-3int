const base = process.env.CMS_HOST;

export default async function cmsAPI(path: string, init: RequestInit) {
  const res = await fetch(base + path, init).then((res) => res.json());
  if (res.data) {
    return res.data;
  }

  return res;
}
