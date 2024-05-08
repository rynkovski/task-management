import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { PlusSquare } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Column } from "../types/types";
import { addColumn } from "../actions/add-column";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardIdContext } from "../hooks/context";

function AddColumnDialog() {
  const queryClient = useQueryClient();
  const boardId = useBoardIdContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState,
    formState: { isSubmitting },
  } = useForm<Column>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const { mutateAsync: addColumnMutation } = useMutation({
    mutationFn: addColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });

  async function onSubmit(data: Column) {
    const title = data.data.title;
    await addColumnMutation({ title, boardId })
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
        Add column
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create column</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Column title:</FormLabel>
                <Input
                  id="title"
                  placeholder="Column title"
                  {...register("data.title")}
                />
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

export default AddColumnDialog;
