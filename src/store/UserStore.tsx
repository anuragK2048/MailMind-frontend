import { create } from "zustand";

interface UIState {
  selectedEmailAccountId: string | null;
  selectedAccountId: string | null;
  isComposeOpen: boolean;
  setSelectedEmailAccountId: (emailId: string | null) => void;
  selectAccount: (accountId: string | null) => void;
  openCompose: () => void;
  closeCompose: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedEmailAccountId: null,
  selectedLabel: "All",
  selectedAccountId: null,
  isComposeOpen: false,
  setSelectedEmailAccountId: (emailId) =>
    set({ selectedEmailAccountId: emailId }),
  selectAccount: (accountId) => set({ selectedAccountId: accountId }),
  openCompose: () => set({ isComposeOpen: true }),
  closeCompose: () => set({ isComposeOpen: false }),
}));
