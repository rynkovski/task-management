import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

import { getAuth } from "firebase/auth";

type TaskCardProps = {
  title: string;
  boardId: string;
};

export async function addTaskCard({ title, boardId }: TaskCardProps) {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const sectionCardsColRef = collection(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/`
  );
  try {
    await addDoc(sectionCardsColRef, {
      title,
    });
  } catch (error) {
    console.error(error);
  }
}
