import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  setAuthorized,
  useAuthorizationStore,
} from "./stores/useAuthorizationStore";

function InnerApp() {
  const authorized = getAuth();
  onAuthStateChanged(authorized, (user) => {
    if (user) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  });
  const auth = useAuthorizationStore((state) => state.authorized);

  return <RouterProvider router={router} context={{ auth }} />;
}

export default function App() {
  return <InnerApp />;
}
