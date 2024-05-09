import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { Id } from "../types/types";

type Props = {
  boardId: Id;
  taskId: Id;
};

export async function deleteTask({ boardId, taskId }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const taskDocRef = doc(db, `users/${uid}/boards/${boardId}/tasks/${taskId}`);
  try {
    await deleteDoc(taskDocRef);
  } catch (error) {
    console.error(error);
  }
}
