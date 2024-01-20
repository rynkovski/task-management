import { Button, Link as ChakraLink, WrapItem } from "@chakra-ui/react";
import { Link as TanstackLink } from "@tanstack/react-router";

function BoardCard(props: any) {
  return (
    <ChakraLink
      textDecoration="none"
      key={props}
      as={TanstackLink}
      to="/boards/$boardId"
      params={{ boardId: { props } }}
    >
      <WrapItem>
        <Button colorScheme="teal" variant="outline">
          {props}
        </Button>
      </WrapItem>
    </ChakraLink>
  );
}

export default BoardCard;
