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
        w="100%"
        shadow="large"
        h={16}
        px={12}
        sx={"justify-between"}
        gap={2}
        bg="slateblue"
        align="center"
        boxShadow="lg"
      >
        <Center gap={2}>
          <ChakraLink as={TanstackLink} to="/boards">
            <ArrowLeftSquare />
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
