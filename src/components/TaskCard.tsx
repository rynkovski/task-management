import {
  Button,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { MoreVertical, PlusSquare, Trash2, X } from "lucide-react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import type { Task, TaskCard } from "../types/types";
import { useGetTasks } from "../actions/get-tasks";
import { useBoardIdContext } from "../hooks/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTasks } from "../actions/add-tasks";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { deleteTaskCard } from "../actions/delete-task-card";
import UpdateTaskCardModal from "./UpdateTaskCardModal";

function TaskCard({ title, cardId }: TaskCard) {
  const boardId = useBoardIdContext();
  const queryClient = useQueryClient();

  const { data: tasksData } = useGetTasks(boardId, cardId);

  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState,
    formState: { isSubmitting },
  } = useForm<Task>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: addTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: deleteTaskCardMutation } = useMutation({
    mutationFn: deleteTaskCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-cards"] });
    },
  });

  const AddTaskItem = () => {
    const [adding, setAdding] = useState(false);
    return (
      <>
        {adding ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Add new task..."
                {...register("title")}
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
            <Button mt={2} variant={"ghost"} onClick={() => setAdding(false)}>
              Close
            </Button>
          </form>
        ) : (
          <Button variant={"ghost"} onClick={() => setAdding(true)} gap={1}>
            <PlusSquare size={16} />
            Add task
          </Button>
        )}
      </>
    );
  };

  async function onSubmit(data: Task) {
    const submitData = { ...data, boardId, cardId };
    console.log(submitData);
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
  console.log(tasksData);
  return (
    <GridItem w="xs" mt={4}>
      <Stack p={3} bg="blue.900" borderRadius={"lg"} cursor={"grab"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text ml={2} as="b">
            {title}
          </Text>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>({tasksData?.length})</Text>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    size={"sm"}
                    variant={"ghost"}
                    p={2}
                  >
                    {isOpen ? <X /> : <MoreVertical />}
                  </MenuButton>
                  <MenuList>
                    <UpdateTaskCardModal cardId={cardId} />

                    <MenuItem
                      alignItems={"center"}
                      gap={2}
                      onClick={() =>
                        deleteTaskCardMutation({ boardId, cardId })
                      }
                    >
                      <Trash2 />
                      Delete
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Stack>
        </Stack>
        <Stack>
          {tasksData?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                title={task.data.title}
                taskId={task.id}
                boardId={boardId}
                cardId={cardId}
                completed={task.data.completed}
              />
            );
          })}
          <AddTaskItem />
        </Stack>
      </Stack>
    </GridItem>
  );
}

export default TaskCard;
