import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { Id } from "../types/types";

type Props = {
  newTitle: string;
  boardId: Id;
  taskId: Id;
};

export async function updateTaskTitle({ newTitle, boardId, taskId }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const boardsDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/tasks/${taskId}`
  );
  try {
    await updateDoc(boardsDocRef, {
      title: newTitle,
    });
  } catch (error) {
    console.error(error);
  }
}
