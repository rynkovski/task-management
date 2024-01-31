import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

type TaskCardProps = {
  boardId: string;
  cardId: string;
};

export async function deleteTaskCard({ boardId, cardId }: TaskCardProps) {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const taskCardDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}`
  );
  try {
    await deleteDoc(taskCardDocRef);
  } catch (error) {
    console.error(error);
  }
}
