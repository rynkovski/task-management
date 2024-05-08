import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Column, Task } from "../types/types";
import { GripVertical, PlusSquare, Trash2Icon, X } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useState } from "react";
import TaskBox from "./TaskBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardIdContext } from "../hooks/context";
import { addTasks } from "../actions/add-tasks";
import { useForm } from "react-hook-form";
import { updateColumnTitle } from "../actions/update-column-title";
import { deleteColumn } from "../actions/delete-column";

type Props = {
  column: Column;
  tasks: Task[];
};

function CardColumn(props: Props) {
  const [editable, setEditable] = useState(false);

  const { column, tasks } = props;

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState,
    formState: { isSubmitting },
  } = useForm<Task>();

  const queryClient = useQueryClient();
  const boardId = useBoardIdContext();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: addTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: updateColumnTitleMutation } = useMutation({
    mutationFn: updateColumnTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });

  const { mutateAsync: deleteColumnMutation } = useMutation({
    mutationFn: deleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const columnId = column.id;
  async function onSubmitTask(data: Task) {
    const title = data.data.title;
    const submitData = { title, columnId, boardId };
    await addTaskMutation(submitData)
      .then(() => {
        toast({
          title: "Added succesfully",
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
  }
  async function onSubmitColumnTitle(data: Column) {
    const newTitle = data.data.title;
    await updateColumnTitleMutation({ boardId, columnId, newTitle })
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

  function AddTaskInput() {
    const [adding, setAdding] = useState(false);
    return (
      <>
        {adding ? (
          <form onSubmit={handleSubmit(onSubmitTask)}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={1}>
              <InputGroup>
                <Input
                  variant="filled"
                  placeholder="Add new task..."
                  {...register("data.title")}
                />
                <InputRightElement>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<PlusSquare />}
                    type="submit"
                    isLoading={isSubmitting}
                  />
                </InputRightElement>
              </InputGroup>
              <Button
                colorScheme="blue"
                variant={"ghost"}
                onClick={() => setAdding(false)}
              >
                Close
              </Button>
            </Flex>
          </form>
        ) : (
          <Button
            variant={"ghost"}
            colorScheme="blue"
            onClick={() => setAdding(true)}
            gap={1}
            w={"full"}
          >
            <PlusSquare size={16} />
            Add task
          </Button>
        )}
      </>
    );
  }
  if (isDragging) {
    return (
      <Flex
        ref={setNodeRef}
        style={style}
        borderRadius={"lg"}
        w={350}
        bg={"blue.900"}
        flexDirection={"column"}
        cursor={"grab"}
        sx={{ opacity: "40%", border: "2px", borderColor: "red.100" }}
      />
    );
  }

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      borderRadius={"lg"}
      w={350}
      bg={"blue.900"}
      flexDirection={"column"}
    >
      <Flex
        m={2}
        p={3}
        bg={"blue.600"}
        borderRadius={"lg"}
        fontWeight={"bold"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box {...attributes} {...listeners} cursor={"grab"}>
          <GripVertical />
        </Box>

        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
          grow={1}
        >
          {editable ? (
            <form onSubmit={handleSubmit(onSubmitColumnTitle)}>
              <Flex align={"center"} gap={1}>
                <Input
                  variant="flushed"
                  defaultValue={column.data.title}
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
            <Flex alignItems={"center"} gap={4} ml={2}>
              <Text onClick={() => setEditable(true)} as="b">
                {column.data.title}
              </Text>
              <Flex px={2} py={1} borderRadius={"full"} bg={"blue.700"}>
                {tasks.length}
              </Flex>
            </Flex>
          )}

          <IconButton
            variant={"ghost"}
            colorScheme={"red"}
            aria-label="trash"
            onClick={() => deleteColumnMutation({ boardId, columnId })}
          >
            <Trash2Icon />
          </IconButton>
        </Flex>
      </Flex>
      <Flex flexGrow={"1"} flexDirection={"column"}>
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskBox key={task.id} task={task} />
          ))}
        </SortableContext>
      </Flex>
      <Flex alignContent={"center"} justifyContent={"center"} p={2}>
        <AddTaskInput />
      </Flex>
    </Flex>
  );
}

export default CardColumn;
