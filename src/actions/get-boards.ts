import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export const getBoards = async () => {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`);

  try {
    const querySnapshot = await getDocs(boardsColRef);
    const boards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
      createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
    }));
    console.log(boards);
    return boards;
  } catch (error) {
    console.error(error);
  }
};

export const useGetBoards = () => {
  const queryFN = () => getBoards();
  return useQuery({
    queryKey: ["boards"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: true,
  });
};
