import { Box, Flex, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { Task } from "../types/types";
import { useEffect, useState } from "react";
import { GripVertical, Trash2Icon, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardIdContext } from "../hooks/context";
import { useForm } from "react-hook-form";
import { updateTaskTitle } from "../actions/update-task-title";
import { deleteTask } from "../actions/delete-task";

type Props = {
  task: Task;
};

function TaskBox(props: Props) {
  const { task } = props;
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editable, setEditable] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const toast = useToast();
  const queryClient = useQueryClient();
  const boardId = useBoardIdContext();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const { handleSubmit, register, reset, formState } = useForm<Task>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const { mutateAsync: updateTaskTitleMutation } = useMutation({
    mutationFn: updateTaskTitle,
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

  const taskId = task.id;

  async function onSubmitTaskTitle(data: Task) {
    const newTitle = data.data.title;
    await updateTaskTitleMutation({ boardId, taskId, newTitle })
      .then(() => {
        toast({
          title: "Title updated succesfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `Something wrong ${error}`,
          description: "Try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    setEditable(false);
  }

  if (isDragging) {
    return (
      <Flex
        m={2}
        p={3}
        alignItems={"center"}
        bg={"blue.700"}
        borderRadius={8}
        justifyContent={"space-between"}
        _hover={{ bg: "blue.600" }}
        h={50}
        ref={setNodeRef}
        style={style}
        sx={{ opacity: "40%", border: "2px", borderColor: "green.100" }}
      />
    );
  }

  return (
    <Flex
      m={2}
      p={3}
      alignItems={"center"}
      bg={"blue.700"}
      borderRadius={8}
      justifyContent={"space-between"}
      _hover={{ bg: "blue.600" }}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      h={50}
      ref={setNodeRef}
      style={style}
    >
      <Flex alignItems={"center"} gap={2}>
        <Box {...attributes} {...listeners} cursor={"grab"}>
          <GripVertical />
        </Box>

        {editable ? (
          <form onSubmit={handleSubmit(onSubmitTaskTitle)}>
            <Flex align={"center"} gap={1}>
              <Input
                variant="flushed"
                defaultValue={task.data.title}
                {...register("data.title")}
              />
              <IconButton
                onClick={() => setEditable(false)}
                size="sm"
                variant={"ghost"}
                aria-label="close-edit-title"
                icon={<X />}
              />
            </Flex>
          </form>
        ) : (
          <Text onClick={() => setEditable(true)}>{task.data.title}</Text>
        )}
      </Flex>
      {mouseIsOver ? (
        <IconButton
          variant={"ghost"}
          colorScheme={"red"}
          aria-label="trash"
          onClick={() => deleteTaskMutation({ boardId, taskId })}
        >
          <Trash2Icon />
        </IconButton>
      ) : null}
    </Flex>
  );
}

export default TaskBox;
