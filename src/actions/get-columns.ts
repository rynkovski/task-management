import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";

export const getColumns = async (boardId: string) => {
  const { currentUser } = getAuth();
  const uid = (currentUser as User).uid;
  const columnsColRef = collection(
    db,
    `users/${uid}/boards/${boardId}/columns/`
  );

  try {
    const querySnapshot = await getDocs(columnsColRef);
    const columns = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return columns;
  } catch (error) {
    console.error(error);
  }
};

export const useGetColumns = (boardId: string) => {
  const queryFN = () => getColumns(boardId);
  return useQuery({
    queryKey: ["columns"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: [],
  });
};
