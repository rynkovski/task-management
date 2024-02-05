import { create } from "zustand";
import { AuthorizationStoreState } from "../types/auth.types";
import { immer } from "zustand/middleware/immer";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export const useAuthorizationStore = create<AuthorizationStoreState>()(
  immer((set) => ({
    authorized: auth.currentUser !== null,
    setAuthorized: (flag) => {
      set((state) => {
        state.authorized = flag;
      });
    },
  }))
);

export const { setAuthorized } = useAuthorizationStore.getState();
