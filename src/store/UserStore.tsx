// import { create } from "zustand";

// const useUserStore = create((set) => ({
//   app_user_id: null,
//   setAppUserId: (id) => set({ app_user_id: id }),
// }));

interface GmailAccountInfo {
  id: string;
  gmail_address: string;
  is_sync_active: boolean;
  last_sync_time: string | null;
}

interface UserProfile {
  id: string;
  full_name: string;
  primary_email: string;
  avatar_url: string;
  gmail_accounts: GmailAccountInfo[]; // Array of linked accounts
}

interface UserState {
  user: UserProfile | null;
}

import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  userEmails: undefined,
  setUserEmails: (emailDetails) => set({ userEmails: emailDetails }),
}));
