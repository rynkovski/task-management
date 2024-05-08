import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { Id } from "../types/types";

type Props = {
  boardId: Id;
  newColumnId: Id;
  taskId: Id;
};

export async function updateTask({ boardId, newColumnId, taskId }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const taskDocRef = doc(db, `users/${uid}/boards/${boardId}/tasks/${taskId}`);
  try {
    await updateDoc(taskDocRef, {
      columnId: newColumnId,
    });
  } catch (error) {
    console.error(error);
  }
}
