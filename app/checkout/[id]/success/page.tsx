import { CSSContainer } from "@/app/styles";

export default function Page() {
  return (
    <section id="checkout_success">
      <div
        id="page_content"
        className={`${CSSContainer} my-8 p-8 grid grid-cols-1 gap-4`}
      >
        <h2>Thank you for you payment!</h2>
        <span>It is currently being processed.</span>

        <h3>If you have bought a digital file</h3>
        <p>
          you will receive an email with download link once your payment is
          confirmed. This should not take more than 5 minutes from now. In case
          you haven't received any email within 1 hour, feel free to contact us
          for assistance. We're here to help!
        </p>

        <h3>If you have bought physical prints</h3>
        <p>you will receive email notifications of your order status</p>
      </div>
    </section>
  );
}
