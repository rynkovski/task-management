import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";

export const getTasks = async (boardId: string, cardId: string) => {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const tasksColRef = collection(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/${cardId}/tasks/`
  );

  try {
    const querySnapshot = await getDocs(tasksColRef);
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return tasks;
  } catch (error) {
    console.error(error);
  }
};

export const useGetTasks = (boardId: string, cardId: string) => {
  const queryFN = () => getTasks(boardId, cardId);
  return useQuery({
    queryKey: ["tasks", boardId, cardId],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
  });
};
