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
  Radio,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { PlusSquare } from "lucide-react";
import { Board } from "../types/types";
import { addBoard } from "../actions/add-board";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const colors = [
  "gray.300",
  "red.300",
  "orange.300",
  "yellow.300",
  "green.300",
  "teal.300",
  "blue.300",
  "cyan.300",
  "purple.300",
  "pink.300",
];

function CreateBoardModal() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState,
    formState: { isSubmitting },
  } = useForm<Board>();

  const { mutateAsync: addBoardMutation } = useMutation({
    mutationFn: addBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  async function onSubmit(data: Board) {
    await addBoardMutation(data)
      .then(() => {
        toast({
          title: "Added succesfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `Something wrong ${error}`,
          description: "Try again later",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen} leftIcon={<PlusSquare />} colorScheme="blue">
        Create board
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} mx={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Board title:</FormLabel>
                <Input
                  id="title"
                  placeholder="Board title"
                  {...register("title")}
                />
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend" py={2}>
                  Select color:
                </FormLabel>
                <RadioGroup id="color" defaultValue="blue">
                  <Stack direction="row" wrap="wrap" spacing="24px">
                    {colors.map((color) => {
                      return (
                        <Radio
                          key={color}
                          value={color}
                          bg={color}
                          colorScheme={color}
                          {...register("color")}
                        />
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose} variant="outline">
                Close
              </Button>
              <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateBoardModal;
