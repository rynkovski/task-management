import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type Props = {
  newTitle: string;
  boardId: string;
};

export async function updateBoardTitle({ newTitle, boardId }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const boardsDocRef = doc(db, `users/${uid}/boards/${boardId}/`);
  try {
    await updateDoc(boardsDocRef, {
      title: newTitle,
    });
  } catch (error) {
    console.error(error);
  }
}
