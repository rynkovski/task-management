import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { Id } from "../types/types";

type Props = {
  newTitle: string;
  boardId: Id;
  columnId: Id;
};

export async function updateColumnTitle({
  newTitle,
  boardId,
  columnId,
}: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const columnsDocRef = doc(
    db,
    `users/${uid}/boards/${boardId}/columns/${columnId}`
  );
  try {
    await updateDoc(columnsDocRef, {
      title: newTitle,
    });
  } catch (error) {
    console.error(error);
  }
}
