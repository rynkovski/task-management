import { create } from "zustand";
import { AuthorizationStoreState } from "../types/auth.types";
import { immer } from "zustand/middleware/immer";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";

const getInitialAuthStatus = () => {
  const status = auth;

  console.log(status);
};

export const useAuthorizationStore = create<AuthorizationStoreState>()(
  immer((set) => ({
    authorized: false,
    setAuthorized: (flag) => {
      set((state) => {
        state.authorized = flag;
      });
    },
  }))
);

export const { setAuthorized } = useAuthorizationStore.getState();
