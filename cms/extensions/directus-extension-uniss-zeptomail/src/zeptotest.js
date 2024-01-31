import { SendMailClient } from "zeptomail";

const url = "api.zeptomail.eu/";
const token =
  "Zoho-enczapikey yA6KbHsM41nxlDgERxQ0gZOM8o5jqa88jnyy7yvhLMdzLdTk3aE3gRppKtG9JzPYjYTZs6tSY4gQc9i/uNkLfpgzZt4Ae5TGTuv4P2uV48xh8ciEYNYigpyoArgVEqJAeRsjDyg4RfQkWA==";

let client = new SendMailClient({ url, token });

client
  .sendMail({
    from: {
      address: "info@3int.uk",
      name: "info",
    },
    to: [
      {
        email_address: {
          address: "dave.kolaja@gmail.com",
          name: "David",
        },
      },
    ],
    subject: "Test Email",
    htmlbody: "<div><b> Test email sent successfully.</b></div>",
  })
  .then((resp) => console.log("success"))
  .catch((error) => console.log("error"));
