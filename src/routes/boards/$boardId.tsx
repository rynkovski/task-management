import { Box } from "@chakra-ui/react";
import { FileRoute } from "@tanstack/react-router";
import BoardTopBar from "../../components/BoardTopBar";
import SectionCard from "../../components/SectionCard";

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
      <BoardTopBar title={boardId} color={"blue.800"} />
      <Box as="main" px={12}>
        <SectionCard />
      </Box>
    </>
  );
}
