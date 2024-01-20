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
import { FileRoute, Link as TanstackLink } from "@tanstack/react-router";
import { KanbanSquare } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

type FormValues = {
  email: string;
  password: string;
};

export const Route = new FileRoute('/login').createRoute({
  component: LoginComponent,
});

function LoginComponent() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 3000);

      toast({
        title: "Login succesful",
        description: "You're being redirected",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  // async function onSubmit(data) {
  //   login(data)
  //     .then(() => {
  //       setAuthorized(true);
  //       navigate("/");
  //       toast({
  //         title: "Login succesful",
  //         description: "You're being redirected",
  //         status: "success",
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Something wrong",
  //         description: "Try again later",
  //         status: "error",
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     });
  // }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
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
            <Button variant="link">Register</Button>
          </ChakraLink>
        </CardFooter>
      </Card>
    </Container>
  );
}
