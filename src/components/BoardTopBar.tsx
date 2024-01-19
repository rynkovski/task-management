import { Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";

function BoardTopBar() {
  return (
    <Flex
      as="header"
      w="100%"
      shadow="large"
      mt={4}
      px={12}
      sx={"justify-between"}
    >
      <Center>
        <Text>Logo</Text>
      </Center>

      <Spacer />
      <Button>Create board</Button>
      <Button ml={2}>Log out</Button>
    </Flex>
  );
}

export default BoardTopBar;
