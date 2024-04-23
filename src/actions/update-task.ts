import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type TaskProps = {
  title: string;
  isCompleted: boolean;
  boardId: string;
  cardId: string;
  taskId: string;
};

export async function updateTask({
  isCompleted,
  boardId,
  cardId,
  taskId,
}: TaskProps) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const taskDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}/tasks/${taskId}`
  );
  try {
    await updateDoc(taskDocRef, {
      completed: isCompleted,
    });
  } catch (error) {
    console.error(error);
  }
}
