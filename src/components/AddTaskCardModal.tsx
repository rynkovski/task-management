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
} from "@chakra-ui/react";
import { PlusSquare } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TaskCard } from "../types/types";
import { addTaskCard } from "../actions/add-task-card";
import { getTaskCards } from "../actions/get-task-cards";

function AddTaskCardModal({ id }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const toast = useToast();
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

  async function onSubmit(data: TaskCard) {
    addTaskCard(data, id);
    //   .then(() => {
    //     toast({
    //       title: "Added succesfully",
    //       status: "success",
    //       duration: 9000,
    //       isClosable: true,
    //     });
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: `Something wrong ${error}`,
    //       description: "Try again later",
    //       status: "error",
    //       duration: 9000,
    //       isClosable: true,
    //     });
    //   });
    onClose();
    getTaskCards(id);
  }
  return (
    <>
      <Button p={3} bg="gray.700" w={100} h={100} onClick={onOpen}>
        <PlusSquare size={50} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add task card</ModalHeader>
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
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTaskCardModal;
