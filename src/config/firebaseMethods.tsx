import { getDatabase, ref, get, push, set } from "firebase/database";
import app from "../config/firebaseConfig"; // Adjust the import path as necessary

// Define the Question interface
interface Question {
  id: string;
  question: string;
}

export const fetchQuestions = async (): Promise<Question[]> => {
  const db = getDatabase(app);
  const questionsRef = ref(db, "question");
  try {
    const snapshot = await get(questionsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const questionsArray: Question[] = Object.entries(data).map(
        ([id, value]) => {
          const questionData = value as Omit<Question, "id">;
          return {
            id: id as string,
            ...questionData,
          };
        }
      );
      return questionsArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};


export const sendData = async (question: string): Promise<void> => {
  const db = getDatabase(app);
  const newData = push(ref(db, "question"));
  try {
    await set(newData, { question });
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

