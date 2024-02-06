import { createDirectus, rest } from "@directus/sdk";

const URL = "https://cms.3int.uk";

const cmsClient = createDirectus(URL);

export default cmsClient;
