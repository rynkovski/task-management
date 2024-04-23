import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Board } from "../types/types";
import { getAuth, User } from "firebase/auth";

export async function addBoard({ title, color }: Board) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
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
