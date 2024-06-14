// Question.tsx
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import app from "../config/firebaseConfig";

interface QuestionData {
  id: string;
  question: string;
}

const Question: any = () => {
  const { id } = useParams<{ id: string }>();
  const [QuestionData, setQuestionData] = useState<QuestionData[]>([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const db = getDatabase(app);
      const questionRef = ref(db, "question");
      console.log(`Fetching data from /QuestionComponent/${id}`);
      try {
        const snapshot = await get(questionRef);
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val() as QuestionData;
          const questionsArray: QuestionData[] = Object.entries(data).map(
            ([id, value]) => {
              const questionData = value as Omit<QuestionData, "id">;
              return {
                id: id as string,
                ...questionData,
              };
            }
          );
          setQuestionData(questionsArray);
        } else {
          console.error("No data available");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);
  const find_data = QuestionData?.find((item) => item?.id === id);

  return (
    <Box
      sx={{
        borderRadius: "5px",
        boxShadow: "2px 3px 2px 2px gray",
        width: "75%",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
      }}
    >
      {find_data ? (
        <>
          <Typography
            sx={{ fontSize: "2rem", fontWeight: "bold", pb: 2, borderBottom: "2px solid #f0f0f0" }}
            component={"h1"}
          >
            Question Details
          </Typography>
          <Typography
            sx={{ fontSize: "20px",paddingTop:'1.5rem',paddingBottom:'1.5rem',
              color:'#007acc'
             }}
            component={"p"}
          >
            {find_data.question}
          </Typography>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default Question;
