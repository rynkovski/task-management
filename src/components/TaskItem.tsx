import { Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

function TaskItem() {
  const [toggleItem, setToggleItem] = useState("none");

  const handleChange = (e: any) => {
    {
      e.target.checked ? setToggleItem("line-through") : setToggleItem("none");
    }
  };

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Checkbox onChange={handleChange} />
        <Text decoration={toggleItem}>Lorem ipsum dolor sit amet</Text>
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
