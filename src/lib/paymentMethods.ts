export type PaymentOption = {
  id: string;
  label: string;
  image: string;
};

// ponytail: static list matching the files in public/Payment Method — only
// changes if someone adds/removes a logo, not worth a dynamic directory read.
export const PAYMENT_METHODS: PaymentOption[] = [
  { id: "ach", label: "ACH", image: "/Payment Method/ACH.png" },
  { id: "apple-pay", label: "ApplePay", image: "/Payment Method/ApplePay.png" },
  { id: "bitcoin", label: "Bitcoin", image: "/Payment Method/Bitcoin.png" },
  { id: "cards", label: "Cards", image: "/Payment Method/Cards.png" },
  { id: "cash-app", label: "Cash App", image: "/Payment Method/Cash App.png" },
  { id: "chime", label: "Chime", image: "/Payment Method/Chime.png" },
  { id: "e-transfer", label: "e-Transfer", image: "/Payment Method/e-Transfer.png" },
  { id: "google-pay", label: "Google Pay", image: "/Payment Method/Google Pay.png" },
  { id: "paypal", label: "Paypal", image: "/Payment Method/Paypal.png" },
  { id: "venmo", label: "Venmo", image: "/Payment Method/Venmo.png" },
  { id: "zelle", label: "zelle", image: "/Payment Method/zelle.png" },
  { id: "bank", label: "Bank", image: "/Payment Method/Banks/Other Bank.png" },
];

export const BANK_OPTIONS: PaymentOption[] = [
  { id: "barclays", label: "Barclays", image: "/Payment Method/Banks/Barclays.png" },
  { id: "bnp-paribas", label: "BNP Paribas", image: "/Payment Method/Banks/BNP Paribas.png" },
  { id: "credit-agricole", label: "Credit Agricole", image: "/Payment Method/Banks/Credit Agricole.png" },
  { id: "hsbc-holdings", label: "HSBC Holdings", image: "/Payment Method/Banks/HSBC Holdings.png" },
  { id: "lloyds-bank", label: "Lloyds Bank", image: "/Payment Method/Banks/Lloyds Bank.png" },
  { id: "santander", label: "Santander", image: "/Payment Method/Banks/Santander.png" },
  { id: "societe-generale", label: "Societe Generale", image: "/Payment Method/Banks/Societe Generale.png" },
  { id: "ubs-group-ag", label: "UBS Group AG", image: "/Payment Method/Banks/UBS Group AG.png" },
  { id: "other-bank", label: "Other Bank", image: "/Payment Method/Banks/Other Bank.png" },
];

export const OTHER_BANK_ID = "other-bank";
