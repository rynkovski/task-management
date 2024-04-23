import { getAuth, User } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useBoardIdContext } from "../hooks/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

type DeleteBoardProps = {
  boardId: string;
};

async function deleteBoard({ boardId }: DeleteBoardProps) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;

  try {
    await deleteDoc(doc(db, `users/${uid}/boards`, `${boardId}`));
  } catch (error) {
    console.error(error);
  }
}

export default function DeleteBoardModal() {
  const boardId = useBoardIdContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const { mutateAsync: deleteBoardMutation } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} variant="outline">
        <Trash2 />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Board
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  deleteBoardMutation({ boardId });
                  navigate({ to: "/boards" });
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
