import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

type TaskProps = {
  title: string;
  boardId: string;
  cardId: string;
  taskId: string;
};

export async function deleteTask({ boardId, cardId, taskId }: TaskProps) {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const taskDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}/tasks/${taskId}`
  );
  try {
    await deleteDoc(taskDocRef);
  } catch (error) {
    console.error(error);
  }
}
