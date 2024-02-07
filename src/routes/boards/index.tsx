import { Box, Center, Heading, Spinner, Text, Wrap } from "@chakra-ui/react";
import { FileRoute, Outlet, redirect } from "@tanstack/react-router";
import BoardsTopBar from "../../components/BoardsTopBar";
import { Link as ChakraLink, WrapItem } from "@chakra-ui/react";
import { Link as TanstackLink } from "@tanstack/react-router";

import { useGetBoards } from "../../actions/get-boards";

export const Route = new FileRoute('/boards/').createRoute({
  beforeLoad: ({ context, location }) => {
    if (!context) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: BoardsIndexComponent,
});

function BoardsIndexComponent() {
  const { data: boardsData, isLoading: isLoadingBoards } = useGetBoards();

  console.log(boardsData);

  return (
    <>
      <BoardsTopBar />
      <Box
        as="main"
        px={12}
        flexDirection={{ base: "column", sm: "row" }}
        alignItems={{ base: "center", sm: "start" }}
      >
        <Heading mt={4}>Select Board</Heading>
        {isLoadingBoards ? (
          <Spinner />
        ) : (
          <>
            {boardsData ? (
              <Wrap my={5} spacing={10}>
                {boardsData.map((board) => {
                  return (
                    <ChakraLink
                      textDecoration="none"
                      key={board.id}
                      as={TanstackLink}
                      to="/boards/$boardId"
                      params={{
                        boardId: `${board.id}`,
                      }}
                    >
                      <WrapItem>
                        <Center
                          borderRadius="lg"
                          bg="blue.800"
                          minW={250}
                          h={100}
                          flexDirection="column"
                          shadow="md"
                          position="relative"
                        >
                          <Box
                            position="absolute"
                            w={2}
                            h={100}
                            bg={board.data.color}
                            roundedLeft={"lg"}
                            left={0}
                          ></Box>
                          <Heading size="md">{board.data.title}</Heading>
                          <Text color="gray">
                            Created at: {board.createdAt}
                          </Text>
                        </Center>
                      </WrapItem>
                    </ChakraLink>
                  );
                })}
              </Wrap>
            ) : (
              <Center>
                <Text size="lg" as="b">
                  No boards. Create one!
                </Text>
              </Center>
            )}
          </>
        )}

        <Outlet />
      </Box>
    </>
  );
}

export default BoardsIndexComponent;
