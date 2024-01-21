import { useAuthorizationStore } from "./stores/useAuthorizationStore";

export default function Authenticated() {
  const authorized = useAuthorizationStore((state) => state.authorized);
  return authorized;
}
