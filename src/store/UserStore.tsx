import { create } from "zustand";

interface UIState {
  selectedEmailAccountIds: string[];
  selectedAccountId: string | null;
  isComposeOpen: boolean;
  setSelectedEmailAccountIds: (emailId: string[]) => void;
  selectAccount: (accountId: string | null) => void;
  openCompose: () => void;
  closeCompose: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedEmailAccountIds: [],
  selectedLabel: "All",
  selectedAccountId: null,
  isComposeOpen: false,
  userData: undefined,
  setUserData: (userData) => set({ userData }),
  setSelectedEmailAccountIds: (emailIds) =>
    set({ selectedEmailAccountIds: emailIds }),
  selectAccount: (accountId) => set({ selectedAccountId: accountId }),
  openCompose: () => set({ isComposeOpen: true }),
  closeCompose: () => set({ isComposeOpen: false }),
}));
