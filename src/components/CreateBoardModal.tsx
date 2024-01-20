import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { PlusSquare } from "lucide-react";
// import { useState } from "react";

function CreateBoardModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [title, setTitle] = useState("");
  // const [color, setColor] = useState("");

  return (
    <>
      <Button onClick={onOpen} leftIcon={<PlusSquare />} colorScheme="teal">
        Create board
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Board title:</FormLabel>
              <Input placeholder="Board title" />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend" py={2}>
                Select color:
              </FormLabel>
              <RadioGroup defaultValue="blue">
                <HStack spacing="24px">
                  <Radio value="red" bg="red" colorScheme="red"></Radio>
                  <Radio value="green" bg="green" colorScheme="green"></Radio>
                  <Radio value="blue" bg="blue" colorScheme="blue"></Radio>
                  <Radio
                    value="yellow"
                    bg="yellow"
                    colorScheme="yellow"
                  ></Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" variant="outline">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateBoardModal;
