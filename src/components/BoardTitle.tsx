import { Flex, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBoardIdContext } from "../hooks/context";
import { useForm } from "react-hook-form";
import { TaskCard } from "../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoardTitle } from "../actions/update-board-title";

function BoardTitle({ title }: { title: string }) {
  const boardId = useBoardIdContext();
  const queryClient = useQueryClient();
  const [editable, setEditable] = useState(false);
  const toast = useToast();
  const { handleSubmit, register, reset, formState } = useForm<TaskCard>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const { mutateAsync: updateBoardTitleMutation } = useMutation({
    mutationFn: updateBoardTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  async function onSubmit(data: TaskCard) {
    const newTitle = data.title;
    await updateBoardTitleMutation({ newTitle, boardId })
      .then(() => {
        toast({
          title: "Title updated succesfully",
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
    setEditable(false);
  }
  return (
    <>
      {editable ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex align={"center"} gap={1}>
            <Input
              variant="flushed"
              {...register("title")}
              defaultValue={title}
            />
            <IconButton
              onClick={() => setEditable(false)}
              size="sm"
              variant={"ghost"}
              aria-label="close-edit-title"
              icon={<X />}
            />
          </Flex>
        </form>
      ) : (
        <Text onClick={() => setEditable(true)} as="b">
          {title}
        </Text>
      )}
    </>
  );
}

export default BoardTitle;
