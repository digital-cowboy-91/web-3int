import { createDirectus, rest } from "@directus/sdk";

const URL = process.env.CMS_HOST;

const cmsClient = createDirectus(URL).with(rest());

export default cmsClient;
