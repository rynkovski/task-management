import {
  Button,
  Grid,
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

function SectionCard() {
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} overflowX={"auto"}>
        <GridItem w="xs" mt={4}>
          <Stack p={3} bg="blue.900" borderRadius={"lg"}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text ml={1} as="b">
                Todos
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
              <InputGroup>
                <Input variant="filled" placeholder="Add task..." />
                <InputRightElement>
                  <IconButton aria-label="delete task">
                    <Trash2 />
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input variant="filled" placeholder="Add task..." />
                <InputRightElement>
                  <IconButton aria-label="delete task">
                    <Trash2 />
                  </IconButton>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem w="xs" mt={10}>
          <Button p={3} bg="gray.700" w={100} h={100}>
            <PlusSquare size={50} />
          </Button>
        </GridItem>
      </Grid>
    </>
  );
}

export default SectionCard;
