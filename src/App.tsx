import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuthorizationStore } from "./stores/useAuthorizationStore";

function InnerApp() {
  const auth = useAuthorizationStore((state) => state.authorized);
  console.log(auth);

  return <RouterProvider router={router} context={{ auth }} />;
}

export default function App() {
  return (
    // <AuthProvider>
    <InnerApp />
    // </AuthProvider>
  );
}
