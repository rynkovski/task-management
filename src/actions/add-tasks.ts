import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

type TaskProps = {
  title: string;
  completed: boolean;
  boardId: string;
  cardId: string;
};

export async function addTasks({ title, boardId, cardId }: TaskProps) {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const tasksColRef = collection(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}/tasks/`
  );
  try {
    await addDoc(tasksColRef, {
      title,
      completed: false,
    });
  } catch (error) {
    console.error(error);
  }
}
