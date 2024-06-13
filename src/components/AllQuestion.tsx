import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import app from "../config/firebaseConfig";
import AskButton from "./AskButton";

interface Question {
  id: string;
  question: string;
}
const AllQuestion: any = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
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
        setAllQuestions(questionsArray);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAskQuestion = () => {
    navigate("/AskQues");
  };

  const handleQuestionClick = (id: string) => {
    navigate(`/QuestionComponent/${id}`);
  };

  return (
    <Box
      sx={{
        borderRadius: "5px",
        boxShadow: "1px 3px 2px 2px gray",
        width: "75%",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
      }}
    >
      <Box>
        <Typography
          sx={{ fontSize: "30px", paddingBottom: "20px" }}
          component={"h1"}
        >
          All Questions
        </Typography>
        <Typography component={"ol"}>
          {allQuestions.map((item) => (
            <Typography
              onClick={() => handleQuestionClick(item.id)}
              sx={{ fontSize: "20px", cursor: "pointer" }}
              key={item.id}
              component={"li"}
            >
              {item.question}
            </Typography>
          ))}
        </Typography>
      </Box>
      <AskButton
        text="Ask Question"
        sx={{ fontSize: "13px", marginTop: "30px" }}
        onClick={handleAskQuestion}
      />
    </Box>
  );
};

export default AllQuestion;
