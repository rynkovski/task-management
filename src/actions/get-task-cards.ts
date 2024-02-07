import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getTaskCards = async (boardId: string) => {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const sectionCardsColRef = collection(
    db,
    `users/${uid}/boards/${boardId}/sectionCards/`
  );

  try {
    const querySnapshot = await getDocs(sectionCardsColRef);
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return cards;
  } catch (error) {
    console.error(error);
  }
};

export const useGetTaskCards = (boardId: string) => {
  const queryFN = () => getTaskCards(boardId);
  return useQuery({
    queryKey: ["task-cards"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
  });
};
