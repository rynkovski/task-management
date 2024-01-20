import {
  Button,
  Center,
  Flex,
  Spacer,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { KanbanSquare } from "lucide-react";
import { Link as TanstackLink } from "@tanstack/react-router";
import CreateBoardModal from "./CreateBoardModal";

function BoardsTopBar() {
  return (
    <Flex
      as="header"
      w="100%"
      shadow="large"
      h={16}
      px={12}
      sx={"justify-between"}
      flexDirection={{ base: "column", sm: "row" }}
      gap={2}
      bg="slateblue"
      align="center"
      boxShadow="lg"
    >
      <Center gap={2}>
        <Text as="b">ZenBoard</Text>
        <KanbanSquare />
      </Center>

      <Spacer />
      <CreateBoardModal />
      <ChakraLink as={TanstackLink} to="/login">
        <Button colorScheme="red" variant="outline">
          Log out
        </Button>
      </ChakraLink>
    </Flex>
  );
}

export default BoardsTopBar;
