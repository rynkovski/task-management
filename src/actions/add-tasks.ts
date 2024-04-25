import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type TaskProps = {
  title: string;
  boardId: string;
  cardId: string;
};

export async function addTasks({ title, boardId, cardId }: TaskProps) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  let uuid = self.crypto.randomUUID();
  const taskCardDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}`
  );

  try {
    await updateDoc(taskCardDocRef, {
      tasks: arrayUnion({ title: title, id: uuid, completed: false }),
    });
  } catch (error) {
    console.error(error);
  }
}
