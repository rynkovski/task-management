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
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  FileRoute,
  Link as TanstackLink,
  useNavigate,
} from "@tanstack/react-router";
import { KanbanSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { LoginInput } from "../types/auth.types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { setAuthorized } from "../stores/useAuthorizationStore";

export const Route = new FileRoute('/login').createRoute({
  component: LoginComponent,
});

function LoginComponent() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginInput>();

  async function onSubmit(data: LoginInput) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setAuthorized(true);
        navigate({ to: "/boards" });
        toast({
          title: "Login succesful",
          description: "You're being redirected",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: `Something wrong`,
          description: "Try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Container>
      <Center>
        <Card align="center" mt={48} w="md">
          <CardHeader w="100%">
            <Center gap={2}>
              <ChakraLink as={TanstackLink} to="/">
                <Text as="b">ZenBoard</Text>
              </ChakraLink>
              <KanbanSquare />
            </Center>
          </CardHeader>
          <CardBody w="100%" px={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  defaultValue={"demo@demo.com"}
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage></FormErrorMessage>
                <FormLabel mt={2}>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    defaultValue={"demo123"}
                    id="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text mt={4}>You can login using this demo credentials</Text>
                <Button
                  colorScheme="blue"
                  mt={4}
                  w="100%"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </FormControl>
            </form>
          </CardBody>
          <CardFooter alignItems="center" gap={1}>
            <Text>Don't have an account?</Text>
            <ChakraLink as={TanstackLink} to="/register">
              <Button variant="link">Sign up</Button>
            </ChakraLink>
          </CardFooter>
        </Card>
      </Center>
    </Container>
  );
}
