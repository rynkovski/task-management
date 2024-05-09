import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, User } from "firebase/auth";

type Props = {
  title: string;
  boardId: string;
};

export async function addColumn({ title, boardId }: Props) {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const columnsColRef = collection(
    db,
    `users/${uid}/boards/${boardId}/columns/`
  );
  try {
    await addDoc(columnsColRef, {
      title,
    });
  } catch (error) {
    console.error(error);
  }
}
