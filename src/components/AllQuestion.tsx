import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "../config/firebaseMethods"; // Adjust the import path as necessary
import AskButton from "./AskButton";

interface Question {
  id: string;
  question: string;
}

const AllQuestion: React.FC = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchQuestions();
        setAllQuestions(questions);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    loadQuestions();
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
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: { xs: "90%", md: "75%" },
        margin: "auto",
        marginTop: "50px",
        padding: "30px",
        backgroundColor: "#fff",
      }}
    >
      <Box mb={3}>
        <Typography
          sx={{ fontSize: "2rem", fontWeight: "bold", pb: 2, borderBottom: "2px solid #f0f0f0" }}
          component="h1"
        >
          All Questions
        </Typography>
        <Box component="ol" sx={{paddingTop:'1.5rem', paddingLeft: "1rem" }}>
          {allQuestions.map((item) => (
            <Typography
              onClick={() => handleQuestionClick(item.id)}
              sx={{
                fontSize: "20px",
                cursor: "pointer",
                color: "#007acc",
                mb: 1,
                '&:hover': {
                  color:'#005c99',
                },
              }}
              key={item.id}
              component="li"
            >
              {item.question}
            </Typography>
          ))}
        </Box>
      </Box>
      <AskButton
        text="Ask Question"
        sx={{
          fontSize: "0.875rem",
          padding: "10px 20px",
          backgroundColor: "#007acc",
          color: "#fff",
          '&:hover': {
            backgroundColor: "#005c99",
          },
        }}
        onClick={handleAskQuestion}
      />
    </Box>
  );
};

export default AllQuestion;

