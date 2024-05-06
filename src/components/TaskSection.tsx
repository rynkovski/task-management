import { Grid, Skeleton, Text } from "@chakra-ui/react";
import { useBoardIdContext } from "../hooks/context";
import TaskCard from "./TaskCard";
import { useGetTaskCards } from "../actions/get-task-cards";
import { DocumentData } from "firebase/firestore";

function TaskCards(props: {
  taskCardData: { id: string; data: DocumentData }[];
}) {
  if (!props.taskCardData.length) return <Text>No cards. Add new one!</Text>;

  return (
    <>
      {props.taskCardData.map((card: { id: string; data: DocumentData }) => (
        <TaskCard
          key={card.id}
          cardId={card.id}
          data={card.data}
          title={card.data.title}
        />
      ))}
    </>
  );
}

function TaskSection() {
  const boardId = useBoardIdContext();

  const { data: taskCardData, isFetching } = useGetTaskCards(boardId);

  return (
    <Grid mt={4} gap={6} templateColumns="repeat(5,1fr)" overflowX={"auto"}>
      {isFetching ? (
        <>
          <Skeleton w={300} h={100} />
          <Skeleton w={300} h={100} />
          <Skeleton w={300} h={100} />
          <Skeleton w={300} h={100} />
          <Skeleton w={300} h={100} />
        </>
      ) : (
        <TaskCards
          taskCardData={taskCardData as { id: string; data: DocumentData }[]}
        />
      )}
    </Grid>
  );
}

export default TaskSection;
