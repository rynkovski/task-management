import { Outlet, RootRoute } from "@tanstack/react-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";
import { setAuthorized } from "../stores/useAuthorizationStore";

export const Route = new RootRoute({
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthorized(!!user);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
