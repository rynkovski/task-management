import {
  Button,
  Center,
  Link as ChakraLink,
  Container,
  Heading,
} from "@chakra-ui/react";
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
      <Center
        h={"100vh"}
        bgGradient={" linear-gradient(to top, #09203f 0%, #537895 100%);"}
      >
        <Container data-testid="go-to-login" p={8} centerContent maxW={"7xl"}>
          <Heading
            as={"h1"}
            size={"4xl"}
            mb={16}
            textAlign={"center"}
            letterSpacing={3}
            textShadow={"0px 10px 60px black;"}
          >
            WELCOME TO ZENBOARD
          </Heading>

          <ChakraLink as={TanstackLink} to="/login">
            <Button data-testid="go-to-login-btn" colorScheme={"blue"}>
              Go to login
            </Button>
          </ChakraLink>
          <Outlet />
        </Container>
      </Center>
    </>
  );
}

export default IndexComponent;
