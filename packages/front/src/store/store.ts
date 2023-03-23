import { create } from 'zustand';

interface Store {
  userEmail: string;
  setUserEmail: (userEmail: string) => void;
}

export const useStore = create<Store>((set) => ({
  userEmail: '',
  setUserEmail: (userEmail: string) => set((state) => ({ ...state, userEmail })),
}));
