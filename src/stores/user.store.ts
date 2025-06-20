import { create } from "zustand";
import { deleteCookie } from "cookies-next";

export interface IUser {
  id: number;
  email: string;
  userName: string;
}

interface IUserStore {
  user: IUser | null;
  onAuthSuccess: (user: IUser | null) => void;
  clearAuth: () => void;
}

const useAuthStore = create<IUserStore>((set) => ({
  user: null,
  onAuthSuccess: (payload) => set(() => ({ user: payload })),
  clearAuth: () => {
    set(() => ({ user: null }));
    deleteCookie("access_token");
  },
}));

export default useAuthStore;
