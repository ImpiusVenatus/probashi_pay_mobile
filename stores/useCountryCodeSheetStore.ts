import { create } from "zustand";
import { CountryCode } from "@/constants/countryCodes";

interface CountryCodeSheetStore {
  isOpen: boolean;
  selectedCountry: CountryCode;
  openSheet: () => void;
  closeSheet: () => void;
  setSelectedCountry: (country: CountryCode) => void;
}

export const useCountryCodeSheetStore = create<CountryCodeSheetStore>(
  (set) => ({
    isOpen: false,
    selectedCountry: { name: "Bangladesh", code: "BD", dial_code: "+880" },
    openSheet: () => set({ isOpen: true }),
    closeSheet: () => set({ isOpen: false }),
    setSelectedCountry: (country) =>
      set({ selectedCountry: country, isOpen: false }),
  })
);
