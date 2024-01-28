import { Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Task } from "../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../actions/update-task";

function TaskItem({ taskId, title, completed, boardId, cardId }: Task) {
  const queryClient = useQueryClient();
  const [toggleItem, setToggleItem] = useState("none");
  const [isCompleted, setIsCompleted] = useState(completed);

  const { mutateAsync: updateTaskMutation } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleChange = (e: any) => {
    {
      e.target.checked ? setToggleItem("line-through") : setToggleItem("none");
    }
    setIsCompleted(!isCompleted);
    const data = { title, isCompleted, boardId, cardId, taskId };
    updateTaskMutation(data);
  };

  return (
    <>
      <Flex id={taskId} alignItems={"center"} justifyContent={"space-between"}>
        <Flex gap={2}>
          <Checkbox onChange={handleChange} />
          <Text decoration={toggleItem}>{title}</Text>
        </Flex>
        <IconButton
          colorScheme="red"
          variant={"ghost"}
          aria-label="delete task"
        >
          <Trash2 />
        </IconButton>
      </Flex>
    </>
  );
}

export default TaskItem;
