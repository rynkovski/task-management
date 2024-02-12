import { Box } from "@chakra-ui/react";
import { FileRoute, redirect } from "@tanstack/react-router";
import BoardTopBar from "../../components/BoardTopBar";
import TaskSection from "../../components/TaskSection";
import { useGetBoards } from "../../actions/get-boards";
import { BoardContext } from "../../hooks/context";

export const Route = new FileRoute('/boards/$boardId').createRoute({
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
  loader: ({ params }) => params.boardId,
  // Or in a component
  component: BoardComponent,
});

function BoardComponent() {
  const { boardId } = Route.useParams();
  const { data: boardsData } = useGetBoards();

  let color = "";
  let title = "";

  boardsData?.forEach((board) => {
    if (board.id === boardId) {
      color = board.data.color;
    }
    if (board.id === boardId) {
      title = board.data.title;
    }
  });

  return (
    <>
      <BoardContext.Provider value={boardId}>
        <BoardTopBar title={title} color={color} />
        <Box as="main" px={12}>
          <TaskSection />
        </Box>
      </BoardContext.Provider>
    </>
  );
}
