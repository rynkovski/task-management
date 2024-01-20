import { Box } from "@chakra-ui/react";
import { FileRoute } from "@tanstack/react-router";
import BoardTopBar from "../../components/BoardTopBar";

export const Route = new FileRoute('/boards/$boardId').createRoute({
  // In a loader
  loader: ({ params }) => params.boardId,
  // Or in a component
  component: BoardComponent,
});

function BoardComponent() {
  const { boardId } = Route.useParams();
  return (
    <>
      <BoardTopBar />
      <Box as="main" px={12}>
        Board ID: {boardId}
      </Box>
    </>
  );
}
