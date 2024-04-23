import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type TaskProps = {
  title: string;
  boardId: string;
  cardId: string;
  taskId: string;
};

export async function deleteTask({ boardId, cardId, taskId }: TaskProps) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
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
