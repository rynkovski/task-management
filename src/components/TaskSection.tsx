import { Grid, GridItem } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import AddTaskCardModal from "./AddTaskCardModal";

function TaskSection() {
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} overflowX={"auto"}>
        <TaskCard />
        <GridItem w="xs" mt={10}>
          <AddTaskCardModal />
        </GridItem>
      </Grid>
    </>
  );
}

export default TaskSection;
