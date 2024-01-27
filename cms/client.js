import { createDirectus, rest } from "@directus/sdk";

const cmsClient = createDirectus("https://cms.3int.uk").with(rest());

export default cmsClient;
