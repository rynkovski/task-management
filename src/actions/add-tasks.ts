import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type TaskProps = {
  title: string;
  completed: boolean;
  boardId: string;
  cardId: string;
};

export async function addTasks({ title, boardId, cardId }: TaskProps) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
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
