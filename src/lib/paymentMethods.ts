export type PaymentOption = {
  id: string;
  label: string;
  image: string;
};

export const PAYMENT_METHODS: PaymentOption[] = [
  { id: "crypto", label: "Crypto", image: "/Payment Method/Bitcoin.png" },
  { id: "bank", label: "Bank", image: "/Payment Method/Banks/Other Bank.png" },
];
