import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Board } from "../types/types";
import { getAuth } from "firebase/auth";

export async function addBoard({ title, color }: Board) {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`);
  try {
    await addDoc(boardsColRef, {
      title,
      color,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}
