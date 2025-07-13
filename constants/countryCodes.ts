export type CountryCode = {
  name: string;
  code: string;
  dial_code: string;
};

export const countryCodes: CountryCode[] = [
  { name: "Bangladesh", code: "BD", dial_code: "+880" },
  { name: "Nigeria", code: "NG", dial_code: "+234" },
  { name: "United States", code: "US", dial_code: "+1" },
  { name: "United Kingdom", code: "GB", dial_code: "+44" },
  { name: "India", code: "IN", dial_code: "+91" },
  // ...add more as needed
];
