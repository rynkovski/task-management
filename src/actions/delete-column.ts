import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { Id } from "../types/types";

type Props = {
  boardId: Id;
  columnId: Id;
};

export async function deleteColumn({ boardId, columnId }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const columnDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/columns/${columnId}`
  );
  try {
    await deleteDoc(columnDocRef);
  } catch (error) {
    console.error(error);
  }
}
