// @ts-ignore
import { SendMailClient } from "zeptomail";

const url = process.env.EMAIL_ZEPTO_URL;
const token = process.env.EMAIL_ZEPTO_SECRET;
const client = new SendMailClient({ url, token });

type TAccount = {
  name: string;
  address: string;
};
type TZeptoMail = {
  from: TAccount;
  to: {
    email_address: TAccount;
  }[];
  reply_to?: TAccount[];
  subject: string;
  textBody: string;
  htmlBody: string;
  track_clicks?: boolean;
  track_opens?: boolean;
};

export default async function zeptoApi(data: TZeptoMail) {
  try {
    const res = await client.sendMail(data);
    return res;
  } catch (e) {
    return e;
  }
}
