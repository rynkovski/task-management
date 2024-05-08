import { Box, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { Task } from "../types/types";
import { useState } from "react";
import { GripVertical, Trash2Icon, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

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
          <Flex align={"center"} gap={1}>
            <Input variant="flushed" defaultValue={task.content} />
            <IconButton
              onClick={() => setEditable(false)}
              size="sm"
              variant={"ghost"}
              aria-label="close-edit-title"
              icon={<X />}
            />
          </Flex>
        ) : (
          <Text onClick={() => setEditable(true)}>{task.content}</Text>
        )}
      </Flex>
      {mouseIsOver ? (
        <IconButton variant={"ghost"} colorScheme={"red"} aria-label="trash">
          <Trash2Icon />
        </IconButton>
      ) : null}
    </Flex>
  );
}

export default TaskBox;
