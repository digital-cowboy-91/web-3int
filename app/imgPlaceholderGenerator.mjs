import { getPlaiceholder } from "plaiceholder";

export default async function imgPlaceholderGenerator(src) {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const plaiceholder = await getPlaiceholder(buffer);

    // console.log(plaiceholder.base64);
    return;
  } catch (err) {
    err;
  }
}

// imgPlaceholderGenerator("");
