export type Currency = {
  name: string;
  code: string;
  symbol: string;
};

export const currencies: Currency[] = [
  { name: "US Dollar", code: "USD", symbol: "$" },
  { name: "Bangladeshi Taka", code: "BDT", symbol: "৳" },
  { name: "Euro", code: "EUR", symbol: "€" },
  { name: "British Pound", code: "GBP", symbol: "£" },
  { name: "Indian Rupee", code: "INR", symbol: "₹" },
  // ...add more as needed
];
