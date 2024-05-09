import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { Id } from "../types/types";

type Props = {
  title: string;
  boardId: Id;
  columnId: Id;
};

export async function addTasks({ title, boardId, columnId }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  // let uuid = self.crypto.randomUUID();
  const tasksColRef = collection(db, `users/${uid}/boards/${boardId}/tasks/`);

  try {
    await addDoc(tasksColRef, {
      title,
      columnId,
    });
  } catch (error) {
    console.error(error);
  }
}
