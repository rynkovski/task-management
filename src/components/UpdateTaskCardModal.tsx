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
  MenuItem,
} from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TaskCard } from "../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardIdContext } from "../hooks/context";
import { updateTaskCard } from "../actions/update-task-card";

type UpdateTaskCardProps = {
  cardId: string;
};

function UpdateTaskCardModal({ cardId }: UpdateTaskCardProps) {
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
  } = useForm<TaskCard>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const { mutateAsync: updateTaskCardMutation } = useMutation({
    mutationFn: updateTaskCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-cards"] });
    },
  });

  async function onSubmit(data: TaskCard) {
    const newTitle = data.title;
    await updateTaskCardMutation({ newTitle, boardId, cardId })
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
      <MenuItem alignItems={"center"} gap={2} onClick={onOpen}>
        <Pencil />
        Edit
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit task card title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Task card title:</FormLabel>
                <Input
                  id="title"
                  placeholder="Card title"
                  {...register("title")}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose} variant="outline">
                Close
              </Button>
              <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
                Edit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateTaskCardModal;
