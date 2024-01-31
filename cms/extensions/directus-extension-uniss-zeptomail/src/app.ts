import { defineOperationApp } from "@directus/extensions-sdk";

export default defineOperationApp({
  id: "directus-extension-uniss-zeptomail",
  name: "Zeptomail",
  icon: "mail",
  description: "Zeptomail transactional service",
  overview: ({ subject, from }) => [
    {
      label: "Subject",
      text: subject,
    },
    {
      label: "Sender",
      text: from,
    },
  ],
  options: [
    {
      field: "fromName",
      name: "From Name",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
      },
    },
    {
      field: "from",
      name: "From",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
      },
    },
    {
      field: "toName",
      name: "To Name",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
      },
    },
    {
      field: "to",
      name: "To",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
      },
    },
    {
      field: "subject",
      name: "Subject",
      type: "string",
      meta: {
        width: "full",
        interface: "input",
      },
    },
    {
      field: "textbody",
      name: "Text Body",
      type: "text",
      meta: {
        width: "full",
        interface: "input-rich-text-html",
      },
    },
  ],
});
