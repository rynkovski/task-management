import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TaskCard } from "../types/types";
import { getAuth } from "firebase/auth";

export async function addTask({ title, boardId, cardId }: TaskCard) {
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
    });
  } catch (error) {
    console.error(error);
  }
}
