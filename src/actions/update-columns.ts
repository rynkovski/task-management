import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { Column, Id } from "../types/types";

type Props = {
  boardId: Id;
  newColumns: Column[];
};

export async function updateColumns({ boardId, newColumns }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const columnDocRef = collection(db, `users/${uid}/boards/${boardId}/columns`);
  try {
    await addDoc(columnDocRef, {
      columns: newColumns,
    });
  } catch (error) {
    console.error(error);
  }
}
