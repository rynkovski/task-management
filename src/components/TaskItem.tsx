import { Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Task = {
  name: string;
  completed: boolean;
};

function TaskItem(name: Task) {
  const [toggleItem, setToggleItem] = useState("none");

  const handleChange = (e: any) => {
    {
      e.target.checked ? setToggleItem("line-through") : setToggleItem("none");
    }
  };

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex gap={2}>
          <Checkbox onChange={handleChange} />
          <Text decoration={toggleItem}>{name.name}</Text>
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
