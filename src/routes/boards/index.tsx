import { Box, Center, Heading, Text, Wrap } from "@chakra-ui/react";
import { FileRoute, Outlet } from "@tanstack/react-router";

import BoardsTopBar from "../../components/BoardsTopBar";
import { Link as ChakraLink, WrapItem } from "@chakra-ui/react";
import { Link as TanstackLink } from "@tanstack/react-router";
export const Route = new FileRoute('/boards/').createRoute({
  component: BoardsIndexComponent,
});

const boardsMock = [
  { id: "1", title: "board1", color: "red", createdAt: "20-01-2024" },
  { id: "2", title: "board2", color: "blue", createdAt: "20-01-2024" },
  { id: "3", title: "board3", color: "green", createdAt: "20-01-2024" },
];

function BoardsIndexComponent() {
  return (
    <>
      <BoardsTopBar />
      <Box as="main" px={12}>
        <Heading mt={2}>Select Board</Heading>
        {/* <Center>
          <Text size="lg" as="b">
            No boards. Create one!
          </Text>
        </Center> */}
        <Wrap my={5} spacing={10}>
          {boardsMock.map((board) => {
            return (
              <ChakraLink
                textDecoration="none"
                key={board.id}
                as={TanstackLink}
                to="/boards/$boardId"
                params={{ boardId: { board } }}
              >
                <WrapItem>
                  <Center
                    borderRadius="lg"
                    border="1px"
                    borderColor={board.color}
                    w={300}
                    h={100}
                    flexDirection="column"
                  >
                    <Heading size="md">{board.title}</Heading>
                    <Text color="gray">Created at: {board.createdAt}</Text>
                  </Center>
                </WrapItem>
              </ChakraLink>
            );
          })}
        </Wrap>
        <Outlet />
      </Box>
    </>
  );
}

export default BoardsIndexComponent;
