import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type TaskCardProps = {
  newTitle: string;
  boardId: string;
  cardId: string;
};

export async function updateTaskCard({
  newTitle,
  boardId,
  cardId,
}: TaskCardProps) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const taskCardDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}`
  );
  try {
    await updateDoc(taskCardDocRef, {
      title: newTitle,
    });
  } catch (error) {
    console.error(error);
  }
}
