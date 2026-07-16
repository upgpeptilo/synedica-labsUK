export type PaymentOption = {
  id: string;
  label: string;
  description: string;
};

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "crypto",
    label: "Crypto Currency",
    description: "We'll send you our crypto wallet details via WhatsApp so you can complete payment.",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. We'll send you our payment information via WhatsApp so you can proceed with the order.",
  },
];
