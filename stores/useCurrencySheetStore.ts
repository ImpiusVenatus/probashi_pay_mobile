import { create } from "zustand";
import { Currency } from "@/constants/currencies";

interface CurrencySheetStore {
  isOpen: boolean;
  selectedCurrency: Currency;
  openSheet: () => void;
  closeSheet: () => void;
  setSelectedCurrency: (currency: Currency) => void;
}

export const useCurrencySheetStore = create<CurrencySheetStore>((set) => ({
  isOpen: false,
  selectedCurrency: { name: "US Dollar", code: "USD", symbol: "$" },
  openSheet: () => set({ isOpen: true }),
  closeSheet: () => set({ isOpen: false }),
  setSelectedCurrency: (currency) =>
    set({ selectedCurrency: currency, isOpen: false }),
}));
