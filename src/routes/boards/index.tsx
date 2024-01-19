import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  HStack,
  Heading,
} from "@chakra-ui/react";
import {
  Link as TanstackLink,
  FileRoute,
  Outlet,
} from "@tanstack/react-router";
import BoardTopBar from "../../components/BoardTopBar";

export const Route = new FileRoute('/boards/').createRoute({
  component: BoardsIndexComponent,
});

function BoardsIndexComponent() {
  return (
    <>
      <BoardTopBar />
      <Box px={12}>
        <Heading>Select board</Heading>
        <HStack>
          <ChakraLink
            as={TanstackLink}
            to="/boards/boards1"
            params={{ boardId: "board1" }}
          >
            <Button>board 1</Button>
          </ChakraLink>
          <ChakraLink
            as={TanstackLink}
            to="/boards/boards2"
            params={{ boardId: "board2" }}
          >
            <Button>board 2</Button>
          </ChakraLink>
          <ChakraLink
            as={TanstackLink}
            to="/boards/boards3"
            params={{ boardId: "board3" }}
          >
            <Button>board 3</Button>
          </ChakraLink>
        </HStack>
        <Outlet />
      </Box>
    </>
  );
}

export default BoardsIndexComponent;
