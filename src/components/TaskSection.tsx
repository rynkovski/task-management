import { Grid, GridItem } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import AddTaskCardModal from "./AddTaskCardModal";
import { useGetTaskCards } from "../actions/get-task-cards";

function TaskSection(id: any) {
  const { data: taskCardsData } = useGetTaskCards(id);

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} overflowX={"auto"}>
        <>
          {taskCardsData?.map((card) => {
            return (
              <TaskCard
                key={card.id}
                title={card.data.title}
                boardId={id}
                cardId={card.id}
              />
            );
          })}
        </>

        <GridItem w="xs" mt={10}>
          <AddTaskCardModal id={id} />
        </GridItem>
      </Grid>
    </>
  );
}

export default TaskSection;
