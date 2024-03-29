import {
  Center,
  Flex,
  Spacer,
  Text,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";
import { ArrowLeftSquare } from "lucide-react";
import { Link as TanstackLink } from "@tanstack/react-router";
import { Board } from "../types/types";
import DeleteBoardModal from "../actions/delete-board";

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

          <Text as="b">{title}</Text>
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
        <DeleteBoardModal />
      </Flex>
    </>
  );
}

export default BoardTopBar;
