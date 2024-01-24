import {
  Button,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MoreVertical, Pencil, PlusSquare, Trash2, X } from "lucide-react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
// import { addTask } from "../actions/add-task";

const mockTasks = ["new", "test", "krzysiem"];

type TaskCard = {
  title: string;
  boardId: string;
  cardId: string;
};

function TaskCard({ title, boardId, cardId }: TaskCard) {
  const handleTaskSubmit = () => {
    console.log({ title, boardId, cardId });
    // addTask({ title, boardId, cardId });
  };

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
              {title}
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
            {mockTasks.map((task) => {
              return <TaskItem key={task} name={task} />;
            })}
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Add task..."
                onSubmit={handleTaskSubmit}
              />
              <InputRightElement>
                <IconButton
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<PlusSquare />}
                  type="submit"
                />
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Stack>
      </GridItem>
    </>
  );
}

export default TaskCard;
