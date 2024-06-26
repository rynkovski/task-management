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
import CreateBoardModal from "./AddBoardModal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function BoardsTopBar() {
  return (
    <Flex
      as="header"
      shadow="large"
      px={12}
      py={4}
      flexDirection={{ base: "column", sm: "row" }}
      gap={2}
      bg="blue.800"
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
        <Button
          onClick={() => signOut(auth)}
          colorScheme="red"
          variant="outline"
          data-cy="logout-btn"
        >
          Log out
        </Button>
      </ChakraLink>
    </Flex>
  );
}

export default BoardsTopBar;
