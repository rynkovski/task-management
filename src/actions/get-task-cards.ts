import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getTaskCards = async ({ id }: any) => {
  const {
    currentUser: { uid },
  }: any = getAuth();
  const sectionCardsColRef = collection(
    db,
    `users/${uid}/boards/${id}/sectionCards/`
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

export const useGetTaskCards = (id: any) => {
  const queryFN = () => getTaskCards(id);
  return useQuery({
    queryKey: ["task-cards"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: true,
  });
};
