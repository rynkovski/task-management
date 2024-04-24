import { Grid } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { useGetTaskCards } from "../actions/get-task-cards";
import { useBoardIdContext } from "../hooks/context";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { StrictModeDroppable } from "./StrictModeDroppable";

type TData = {
  id: string;
  data: DocumentData;
};

function TaskSection() {
  const boardId = useBoardIdContext();
  const { data } = useGetTaskCards(boardId);

  const [cards, updateCards] = useState(data || []);

  useEffect(() => {
    updateCards(data as TData[]);
  }, [data]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newCards = [...cards];
    const [reorderedItem] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, reorderedItem);
    updateCards(newCards);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable droppableId="cards" direction="horizontal">
        {(provided) => (
          <Grid
            mt={4}
            gap={6}
            templateColumns="repeat(5,1fr)"
            {...provided.droppableProps}
            ref={provided.innerRef}
            overflowX={"auto"}
          >
            {cards?.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <TaskCard title={card.data.title} cardId={card.id} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

export default TaskSection;
