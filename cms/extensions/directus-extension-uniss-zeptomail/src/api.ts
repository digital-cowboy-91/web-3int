import { defineOperationApi } from "@directus/extensions-sdk";
import { SendMailClient } from "zeptomail";

type Options = {
  fromName: string;
  from: string;
  toName: string;
  to: string;
  subject: string;
  textbody: string;
};

export default defineOperationApi<Options>({
  id: "directus-extension-uniss-zeptomail",
  handler: ({ fromName, from, toName, to, subject, textbody }) => {
    let url = process.env.ZEPTOMAIL_URL;
    let token = process.env.ZEPTOMAIL_TOKEN;

    if (!url || url === "") {
      console.log("Zeptomail: missing env variable ZEPTOMAIL_URL");
      throw new Error();
    }

    if (!token || token === "") {
      console.log("Zeptomail: missing env variable ZEPTOMAIL_TOKEN");
      throw new Error();
    }

    if (!url.endsWith("/")) {
      url += "/";
    }

    try {
      let client = new SendMailClient({ url, token });

      client
        .sendMail({
          from: {
            address: from,
            name: fromName,
          },
          to: [
            {
              email_address: {
                address: to,
                name: toName,
              },
            },
          ],
          subject,
          htmlbody: textbody,
        })
        .then((_res: any) => console.log("Zeptomail: Success"));
    } catch (err) {
      console.log("Zeptomail: Error");
      console.log(err);
    }
  },
});
