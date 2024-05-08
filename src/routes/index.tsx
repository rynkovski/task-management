import {
  Button,
  Center,
  Link as ChakraLink,
  Container,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  Link as TanstackLink,
  FileRoute,
  Outlet,
} from "@tanstack/react-router";
import { KanbanSquare } from "lucide-react";

export const Route = new FileRoute('/').createRoute({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <>
      <Flex
        as="header"
        shadow="large"
        px={12}
        py={8}
        flexDirection={{ base: "column", sm: "row" }}
        gap={2}
        align="center"
        maxW={"7xl"}
        mx={"auto"}
      >
        <Center gap={2}>
          <Text as="b">ZenBoard</Text>
          <KanbanSquare />
        </Center>

        <Spacer />

        <ChakraLink as={TanstackLink} to="/login">
          <Button colorScheme={"blue"}>Login</Button>
        </ChakraLink>
      </Flex>
      <Center mt={52}>
        <Container
          data-cy="hero-container"
          p={8}
          centerContent
          maxW={"7xl"}
          gap={4}
        >
          <Heading
            as={"h1"}
            size={{ base: "2xl", md: "3xl" }}
            textAlign={"center"}
            letterSpacing={2}
            fontFamily={"sans-serif"}
            fontWeight={900}
          >
            <Text as={"i"}>SLIDE </Text>
            INTO{" "}
            <Text as={"span"} color={"blue.200"}>
              PRODUCTIVITY{" "}
            </Text>
            MODE
          </Heading>
          <Text>
            Because getting stuff done should feel as easy as Sunday morning.
          </Text>
          <ChakraLink as={TanstackLink} to="/login">
            <Button data-cy="go-to-login-btn" colorScheme={"blue"}>
              Try now
            </Button>
          </ChakraLink>
          <Outlet />
        </Container>
      </Center>
    </>
  );
}

export default IndexComponent;
