import {
  Center,
  Flex,
  Spacer,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";
import { ArrowLeftSquare } from "lucide-react";
import { Link as TanstackLink } from "@tanstack/react-router";
import { Board } from "../types/types";
import DeleteBoardModal from "../actions/delete-board";
import BoardTitle from "./BoardTitle";
import AddTaskCardModal from "./AddTaskCardModal";

function BoardTopBar({ title, color }: Board) {
  return (
    <>
      <Flex
        as="header"
        shadow="large"
        px={12}
        py={4}
        flexDirection={{ base: "column", sm: "row" }}
        gap={2}
        bg={"blue.800"}
        align="center"
        boxShadow="lg"
        position={"relative"}
      >
        <Center gap={2}>
          <ChakraLink as={TanstackLink} to="/boards">
            <ArrowLeftSquare size={28} />
          </ChakraLink>
          <BoardTitle title={title} />
        </Center>
        <Box
          position={"absolute"}
          bg={color}
          w={"100%"}
          h={1}
          left={0}
          top={{ base: "112px", sm: "68px" }}
        />
        <Spacer />
        <AddTaskCardModal />
        <DeleteBoardModal />
      </Flex>
    </>
  );
}

export default BoardTopBar;
