import {
  Button,
  Center,
  Flex,
  Spacer,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ArrowLeftSquare, Trash2 } from "lucide-react";
import { Link as TanstackLink } from "@tanstack/react-router";

function BoardTopBar() {
  return (
    <>
      <Flex
        as="header"
        shadow="large"
        px={12}
        py={4}
        sx={"justify-between"}
        flexDirection={{ base: "column", sm: "row" }}
        gap={2}
        bg="blue.800"
        align="center"
        boxShadow="lg"
      >
        <Center gap={2}>
          <ChakraLink as={TanstackLink} to="/boards">
            <ArrowLeftSquare size={28} />
          </ChakraLink>

          <Text as="b">Board name</Text>
        </Center>

        <Spacer />

        <Button colorScheme="red" variant="outline">
          <Trash2 />
        </Button>
      </Flex>
    </>
  );
}

export default BoardTopBar;
