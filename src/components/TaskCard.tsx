import {
  Button,
  GridItem,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MoreVertical, Pencil, Trash2, X } from "lucide-react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import TaskItem from "./TaskItem";

function TaskCard() {
  return (
    <>
      <GridItem w="xs" mt={4}>
        <Stack p={3} bg="blue.900" borderRadius={"lg"}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text ml={1} as="b">
              Todo
            </Text>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen} as={Button}>
                    {isOpen ? <X /> : <MoreVertical />}
                  </MenuButton>
                  <MenuList>
                    <MenuItem alignItems={"center"} gap={2}>
                      <Pencil />
                      Edit
                    </MenuItem>
                    <MenuItem alignItems={"center"} gap={2}>
                      <Trash2 />
                      Delete
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Stack>
          <Stack>
            <TaskItem />
            <InputGroup>
              <Input variant="filled" placeholder="Add task..." />
            </InputGroup>
          </Stack>
        </Stack>
      </GridItem>
    </>
  );
}

export default TaskCard;
