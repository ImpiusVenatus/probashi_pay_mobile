import { create } from "zustand";

export type SendSourceType = "account" | "card";

export interface AccountOrCard {
  id: string;
  name: string;
  number: string;
  type: SendSourceType;
}

interface SendMoneyState {
  amount: string;
  beneficiary: string;
  from: AccountOrCard | null;
  sourceType: SendSourceType;
  setAmount: (amount: string) => void;
  setBeneficiary: (beneficiary: string) => void;
  setFrom: (from: AccountOrCard) => void;
  setSourceType: (type: SendSourceType) => void;
  reset: () => void;
}

export const useSendMoneyStore = create<SendMoneyState>((set) => ({
  amount: "",
  beneficiary: "",
  from: null,
  sourceType: "account",
  setAmount: (amount) => set({ amount }),
  setBeneficiary: (beneficiary) => set({ beneficiary }),
  setFrom: (from) => set({ from }),
  setSourceType: (sourceType) => set({ sourceType }),
  reset: () =>
    set({ amount: "", beneficiary: "", from: null, sourceType: "account" }),
}));
