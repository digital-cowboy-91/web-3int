import { createDirectus, rest } from "@directus/sdk";

const cmsClient = createDirectus(process.env.CMS_HOST).with(rest());

export default cmsClient;
