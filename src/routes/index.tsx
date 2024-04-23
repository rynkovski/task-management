import {
  Button,
  Center,
  Link as ChakraLink,
  Container,
  Heading,
  Text,
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
      <Center h={"100vh"}>
        <Container
          data-testid="go-to-login"
          p={8}
          centerContent
          maxW={"7xl"}
          gap={4}
        >
          <Heading
            as={"h1"}
            size={{ base: "2xl", md: "4xl" }}
            textAlign={"center"}
            letterSpacing={3}
          >
            <Text as={"span"} color={"blue.200"}>
              Find{" "}
            </Text>{" "}
            Your Flow with Zenboard
          </Heading>
          <Text>
            <Text as={"span"} color={"blue.200"}>
              Harmonize{" "}
            </Text>
            Your Workflow,
            <Text as={"span"} color={"blue.200"}>
              {" "}
              Simplify{" "}
            </Text>
            Your Success.
          </Text>
          <ChakraLink as={TanstackLink} to="/login">
            <Button data-testid="go-to-login-btn" colorScheme={"blue"}>
              Try for free
            </Button>
          </ChakraLink>
          <Outlet />
        </Container>
      </Center>
    </>
  );
}

export default IndexComponent;
