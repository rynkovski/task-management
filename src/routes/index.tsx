import { Button, Link as ChakraLink, Container } from "@chakra-ui/react";
import {
  Link as TanstackLink,
  FileRoute,
  Outlet,
} from "@tanstack/react-router";

export const Route = new FileRoute('/').createRoute({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <>
      <Container data-testid="go-to-login" p={8} centerContent>
        <ChakraLink as={TanstackLink} to="/login">
          <Button data-testid="go-to-login-btn">Go to login</Button>
        </ChakraLink>

        <Outlet />
      </Container>
    </>
  );
}

export default IndexComponent;
