import { Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Task } from "../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../actions/update-task";
import { deleteTask } from "../actions/delete-task";

function TaskItem({ taskId, title, completed, boardId, cardId }: Task) {
  const queryClient = useQueryClient();
  const [toggleItem, setToggleItem] = useState("none");
  const [isCompleted, setIsCompleted] = useState(!completed);

  const { mutateAsync: updateTaskMutation } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const { mutateAsync: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  useEffect(() => {
    {
      isCompleted ? setToggleItem("none") : setToggleItem("line-through");
    }
  }, []);

  const data = { title, isCompleted, boardId, cardId, taskId };
  const handleChange = (e: any) => {
    {
      e.target.checked ? setToggleItem("line-through") : setToggleItem("none");
    }
    setIsCompleted(!isCompleted);

    updateTaskMutation(data);
  };

  return (
    <>
      <Flex
        id={taskId}
        alignItems={"center"}
        justifyContent={"space-between"}
        bg={"blue.700"}
        p={2}
        pl={4}
        borderRadius={8}
        _hover={{ bg: "blue.600", cursor: "grab" }}
      >
        <Flex gap={2}>
          <Checkbox defaultChecked={completed} onChange={handleChange} />
          <Text decoration={toggleItem}>{title}</Text>
        </Flex>
        <IconButton
          colorScheme="red"
          variant={"ghost"}
          aria-label="delete task"
          onClick={() => deleteTaskMutation(data)}
        >
          <Trash2 />
        </IconButton>
      </Flex>
    </>
  );
}

export default TaskItem;
