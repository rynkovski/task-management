import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

type Props = {
  newTitle: string;
  boardId: string;
};

export async function updateBoardTitle({ newTitle, boardId }: Props) {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const boardsDocRef = doc(db, `users/${uid}/boards/${boardId}/`);
  try {
    await updateDoc(boardsDocRef, {
      title: newTitle,
    });
  } catch (error) {
    console.error(error);
  }
}
