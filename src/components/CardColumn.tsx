import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Column, Id, Task } from "../types/types";
import { GripVertical, PlusSquare, Trash2Icon, X } from "lucide-react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskBox from "./TaskBox";

type Props = {
  column: Column;
  deleteColumn: (id: Id) => void;
  addTask: (columnId: Id) => void;
  tasks: Task[];
};

function CardColumn(props: Props) {
  const [editable, setEditable] = useState(false);

  const { column, deleteColumn, tasks, addTask } = props;

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

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Flex
        ref={setNodeRef}
        style={style}
        borderRadius={"lg"}
        maxH={500}
        w={350}
        h={500}
        bg={"blue.900"}
        flexDirection={"column"}
        cursor={"grab"}
        sx={{ opacity: "40%", border: "2px", borderColor: "red.100" }}
      />
    );
  }

  function AddTaskInput() {
    const [adding, setAdding] = useState(false);
    return (
      <>
        {adding ? (
          <Flex alignItems={"center"} justifyContent={"center"} gap={1}>
            <InputGroup>
              <Input variant="filled" placeholder="Add new task..." />
              <InputRightElement>
                <IconButton
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<PlusSquare />}
                  type="submit"
                  onClick={() => {
                    addTask(column.id);
                  }}
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

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      borderRadius={"lg"}
      maxH={500}
      w={350}
      h={500}
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
            <Flex align={"center"} gap={1}>
              <Input variant="flushed" defaultValue={column.title} />
              <IconButton
                onClick={() => setEditable(false)}
                size="sm"
                variant={"ghost"}
                aria-label="close-edit-title"
                icon={<X />}
              />
            </Flex>
          ) : (
            <Flex alignItems={"center"} gap={4}>
              <Text onClick={() => setEditable(true)} as="b">
                {column.title}
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
            onClick={() => deleteColumn(column.id)}
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
