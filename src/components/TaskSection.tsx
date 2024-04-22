import { Grid, GridItem } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import AddTaskCardModal from "./AddTaskCardModal";
import { useGetTaskCards } from "../actions/get-task-cards";
import { useBoardIdContext } from "../hooks/context";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

type TData = {
  id: string;
  data: DocumentData;
};

function TaskSection() {
  const boardId = useBoardIdContext();
  const { data } = useGetTaskCards(boardId);

  const [cards, setCards] = useState(data || []);

  useEffect(() => {
    setCards(data as TData[]);
  }, [data]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newCards = [...cards];

    const [reorderedItem] = newCards.splice(result.source.index, 1);

    newCards.splice(result.destination.index, 0, reorderedItem);
    setCards(newCards);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} overflowX={"auto"}>
        <Droppable droppableId="cards">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
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
            </section>
          )}
        </Droppable>
        <GridItem w="xs" mt={10}>
          <AddTaskCardModal />
        </GridItem>
      </Grid>
    </DragDropContext>
  );
}

export default TaskSection;
