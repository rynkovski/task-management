import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type TaskProps = {
  title: string;
  boardId: string;
  cardId: string;
  taskId: string;
  newCompleted: boolean;
};

export async function deleteTask({
  title,
  boardId,
  cardId,
  taskId,
  newCompleted,
}: TaskProps) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const taskCardDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}`
  );
  try {
    await updateDoc(taskCardDocRef, {
      tasks: arrayRemove({ title: title, id: taskId, completed: newCompleted }),
    });
  } catch (error) {
    console.error(error);
  }
}
