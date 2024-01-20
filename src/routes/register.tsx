import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Link as ChakraLink,
  Input,
  FormControl,
  FormLabel,
  Container,
  Center,
} from "@chakra-ui/react";
import { FileRoute, Link as TanstackLink } from "@tanstack/react-router";
import { KanbanSquare } from "lucide-react";
import { useState } from "react";

export const Route = new FileRoute('/register').createRoute({
  component: RegisterComponent,
});

function RegisterComponent() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container>
      <Card align="center" maxW="md" mt={48}>
        <CardHeader>
          <Center gap={2}>
            <Text as="b">ZenBoard</Text>
            <KanbanSquare />
          </Center>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input id="email" type="email" placeholder="Enter email" />
            <FormLabel mt={2}>Password</FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <ChakraLink as={TanstackLink} to="/boards">
              <Button>Register</Button>
            </ChakraLink>
          </FormControl>
        </CardBody>
        <CardFooter alignItems="center" flexDirection="column" gap={2}>
          <Text>Do you have an account?</Text>
          <ChakraLink as={TanstackLink} to="/login">
            <Button>Login</Button>
          </ChakraLink>
        </CardFooter>
      </Card>
    </Container>
  );
}
