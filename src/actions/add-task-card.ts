import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TaskCard } from "../types/types";
import { getAuth } from "firebase/auth";

export async function addTaskCard({ title }: TaskCard, { id }: any) {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const sectionCardsColRef = collection(
    db,
    `users/${uid}/boards/${id}/sectionCards/`
  );
  try {
    await addDoc(sectionCardsColRef, {
      title,
    });
  } catch (error) {
    console.error(error);
  }
}
