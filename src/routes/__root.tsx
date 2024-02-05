import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { AuthContext } from "../auth";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthContext;
}

export const Route = rootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
