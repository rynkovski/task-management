import { Router } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = new Router({
  routeTree,
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    auth: undefined!,
  },
});
