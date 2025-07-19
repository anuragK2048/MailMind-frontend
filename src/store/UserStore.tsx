// import { create } from "zustand";

// const useUserStore = create((set) => ({
//   app_user_id: null,
//   setAppUserId: (id) => set({ app_user_id: id }),
// }));

import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  userEmails: undefined,
  setUserEmails: (emailDetails) => set({ userEmails: emailDetails }),
}));
