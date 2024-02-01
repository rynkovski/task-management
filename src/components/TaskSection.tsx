import { Grid, GridItem } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import AddTaskCardModal from "./AddTaskCardModal";
import { useGetTaskCards } from "../actions/get-task-cards";
import { useBoardIdContext } from "./context";

function TaskSection() {
  const boardId = useBoardIdContext();
  const { data: taskCardsData } = useGetTaskCards(boardId);

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} overflowX={"auto"}>
        <>
          {taskCardsData?.map((card) => {
            return (
              <TaskCard
                key={card.id}
                title={card.data.title}
                cardId={card.id}
              />
            );
          })}
        </>
        <GridItem w="xs" mt={10}>
          <AddTaskCardModal />
        </GridItem>
      </Grid>
    </>
  );
}

export default TaskSection;
