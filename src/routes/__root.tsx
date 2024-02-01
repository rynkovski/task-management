import { Outlet, rootRouteWithContext } from "@tanstack/react-router";

interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: boolean;
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
