import asCurrency from "@/app/lib/asCurrency";
import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

OrderSummaryEmail.PreviewProps = {
  emailId: "770e9d25-cbd8-4386-b174-7a2c02697700",
  title: "Template Title",
  subtitle: "Template Subtitle",
  preview: "Preview",
  data: {
    customer_ref: {
      email: "b5p8I@example.com",
    },
    discount: 0,
    id: "770e9d25-cbd8-4386-b174-7a2c02697700",
    order_status: "received",
    payment_status: "succeeded",
    receipt_url:
      "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xT216dTdKbGduUGFPYVdPKM2usa8GMgZrUUwPSms6LBYQN_uoqUQ26gqNqYJpOpqYKj_nHHfyolXl7aU16AwhX8syzsOG70PeHBFc",
    shipping_ref: null,
    shipping: 0,
    subtotal: 300,
    tax: 63,
    total: 300,
    tracking_number: null,
    item_refs: [
      {
        id: "0aee26ce-ebd7-4120-8bb7-fa96634e7c65",
        quantity: 1,
        description: "STL digital file",
        discount: 0,
        discount_pct: 0,
        price_at_sale: 300,
        amount: 300,
        product_ref: {
          is_digital: true,
          gallery_ref: {
            title: "RPI4 Waveshare UPS (B) Case",
            cover_image: "ffba0b9b-be3e-49d0-9769-8372551eff54",
          },
        },
      },
    ],
  },
};

type TProps = typeof OrderSummaryEmail.PreviewProps;

const base = process.env.WEB_PUBLIC_URL;

export default function OrderSummaryEmail({
  emailId,
  title,
  subtitle,
  preview,
  data: {
    discount,
    id,
    shipping,
    subtotal,
    tax,
    total,
    item_refs,
    customer_ref,
  },
}: TProps) {
  const summaryList = [
    { name: "Subtotal", value: subtotal },
    { name: "Discount", value: discount },
    { name: "Shipping", value: shipping },
    { name: "Tax", value: tax },
    { name: "Total", value: total },
  ];
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontSize: {
                "2xs": ["10px", "12px"],
              },
              colors: {
                white: "#FFFFFF",
                dark: "#0D0C0C",
                primary: {
                  DEFAULT: "#0D79F2",
                  light: "#0D79F2",
                },
                action: {
                  DEFAULT: "#ffcd00",
                },
                grey: {
                  DEFAULT: "#808080",
                  light: "#EBEBEB",
                },
                error: {
                  DEFAULT: "#ff0000",
                },
                success: {
                  DEFAULT: "#3cb012",
                  light: "#d9e5d5",
                },
              },
            },
            boxShadow: {
              DEFAULT: "5px 5px 20px 5px rgba(0, 0, 0, 0.3)",
              sm: "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)",
            },
          },
        }}
      >
        <head>
          <link
            rel="icon"
            href="/media/139473a8-56f1-4fd9-bd09-80bc40a26aba/favicon.svg"
            sizes="any"
          />
        </head>
        <Head>
          <Font
            fontFamily="Poppins"
            fallbackFontFamily="Arial"
            webFont={{
              url: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2",
              format: "woff2",
            }}
            fontWeight={300}
            fontStyle="normal"
          />
          <Font
            fontFamily="Poppins"
            fallbackFontFamily="Arial"
            webFont={{
              url: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
          <Font
            fontFamily="Poppins"
            fallbackFontFamily="Arial"
            webFont={{
              url: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2",
              format: "woff2",
            }}
            fontWeight={600}
            fontStyle="normal"
          />
        </Head>
        <Preview>{preview}</Preview>
        <Body className={main}>
          <Container className="p-4 md:p-8">
            <Section className={section}>
              <Link href={base}>
                <Img
                  src={`${base}/media/139473a8-56f1-4fd9-bd09-80bc40a26aba?key=h100`}
                  alt="3INT UK logo"
                  className="w-[100px] object-contain mx-auto"
                />
              </Link>
              <Text className={`${text} font-bold text-center`}>
                3INT UK, your 3D printing service
              </Text>
            </Section>
            <Section
              className={`${section} p-4 bg-success rounded-[2rem] text-white text-center shadow`}
            >
              <Heading as="h1" className={h1 + " " + text}>
                {title}
              </Heading>
              <Text className={text}>{subtitle}</Text>
            </Section>
            <Section className={section}>
              {item_refs.map((item) => (
                <Row
                  key={item.id}
                  className="bg-white rounded-md mb-4 p-4 md:p-8 shadow-sm"
                >
                  <Column className="w-[150px]">
                    {item.product_ref.gallery_ref.cover_image ? (
                      <Img
                        src={`${base}/media/${item.product_ref.gallery_ref.cover_image}?key=h250`}
                        alt={item.product_ref.gallery_ref.title}
                        className="w-[150px] object-contain me-4 md:me-8"
                      />
                    ) : (
                      "No Image"
                    )}
                  </Column>
                  <Column>
                    <Row>
                      <Column>
                        <Heading as="h2" className={h2 + " " + text}>
                          {item.product_ref.gallery_ref.title}
                        </Heading>
                        <Text className={text}>{item.description}</Text>
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <Text className={text}>
                          <strong>{asCurrency(item.amount)}</strong>
                          {item.discount
                            ? `, you've saved ${asCurrency(item.discount)}`
                            : ""}
                        </Text>
                      </Column>
                      <Column>
                        {item.product_ref.is_digital && (
                          //@ts-ignore
                          <Text align="right">
                            <Link href={`${base}/d/${id}/${item.id}`}>
                              Download
                            </Link>
                          </Text>
                        )}
                      </Column>
                    </Row>
                  </Column>
                </Row>
              ))}
            </Section>
            <Section
              className={`${section} rounded-[2rem] bg-success-light p-4 md:p-8 shadow`}
            >
              {summaryList.map(({ name, value }, index) => (
                <Row
                  key={index}
                  className={
                    summaryList.length - 1 === index
                      ? "text-primary font-bold"
                      : ""
                  }
                >
                  <Column>
                    <Text className={text}>{name}</Text>
                  </Column>
                  <Column align="right">
                    <Text className={`${text} font-bold`}>
                      {asCurrency(value)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
            <Section className={`${section}`}>
              <Text className="text-xs">
                1. Trouble seeing this email?{" "}
                <Link href={`${base}/e/${emailId}`}>
                  View it in your browser
                </Link>
              </Text>
              <Text className="text-xs">
                2. You've received this email as it contains important
                information about your recent order. To ensure you receive
                essential order updates, you'll continue to get emails like this
                one.
              </Text>
              <Text className="text-xs">
                3. If you have encountered any issues with your order, please
                contact us at{" "}
                <Link href="mailto:info@3int.uk">info@3int.uk</Link> or{" "}
                <Link href="tel:+447123456789">+44 (0)7 123 456 789</Link>.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const main = "text-dark bg-neutral-100";
const section = "mb-4 md:mb-8";
const text = "my-1";
const h1 = "text-3xl font-bold uppercase";
const h2 = "text-xl font-bold";
