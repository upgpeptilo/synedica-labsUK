export type PaymentOption = {
  id: string;
  label: string;
  description: string;
};

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "bank",
    label: "Bank Transfer",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Our team will email you our payment information after reviewing your order.",
  },
];
