import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { setAuthorized } from "../stores/useAuthorizationStore";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: boolean;
}

export const Route = rootRouteWithContext<MyRouterContext>()({
  beforeLoad: () =>
    onAuthStateChanged(auth, (user) => {
      setAuthorized(!!user);
    }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
