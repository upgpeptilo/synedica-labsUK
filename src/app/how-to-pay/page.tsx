import { WHATSAPP_URL } from "@/lib/whatsapp";

export const metadata = { title: "How to Pay – Synedica UK" };

const bankSteps = [
  {
    title: "1. Place Your Order",
    body: "Add your items to the cart and complete checkout on our website.",
  },
  {
    title: "2. Message Us on WhatsApp",
    body: "After placing your order, message us on WhatsApp to receive our secure bank account details.",
  },
  {
    title: "3. Make Payment Using Your Name as Reference",
    body: "Transfer the total amount using your full name as the payment reference so we can confirm your order quickly.",
  },
  {
    title: "4. Confirm Your Payment",
    body: "Send a screenshot or proof of payment on WhatsApp once the transfer is complete.",
  },
  {
    title: "5. Order Confirmation & Shipping",
    body: "After we verify your payment, your order will be processed and shipped immediately.",
  },
];

export default function HowToPayPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-neutral-700">
      <h1 className="font-heading text-3xl font-bold text-dark">How to Pay</h1>

      <p className="mt-6">
        At Synedica UK, we ensure all payments are safe, simple, and secure.
        <br />
        We accept <span className="font-semibold text-dark">Bank Transfer</span> for a smooth and private
        transaction experience.
      </p>

      <h2 className="mt-8 font-heading text-xl font-bold text-dark">Hit the WhatsApp Button Below for instructions:</h2>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded bg-dark px-8 py-4 text-lg font-semibold text-white hover:bg-neutral-800"
      >
        WHATSAPP US !!
      </a>

      <div className="mt-12 border-t border-neutral-200 pt-8">
        <h2 className="font-heading text-lg font-bold text-dark">Bank Transfer Payment Process</h2>
        <div className="mt-4 space-y-5">
          {bankSteps.map((step) => (
            <div key={step.title}>
              <p className="font-semibold text-dark">{step.title}</p>
              <p className="mt-1">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
