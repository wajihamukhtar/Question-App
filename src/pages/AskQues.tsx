import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendData } from "../config/firebaseMethods"; // Adjust the import path as necessary
import AskButton from "../components/AskButton";

const Askques = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const handleSendData = async () => {
    if (inputValue === "") {
      alert("Enter Comment");
    } else {
      try {
        await sendData(inputValue);
        navigate("/");
        alert("Question submitted successfully");
      } catch (error) {
        console.error("Error sending data:", error);
        alert("Failed to submit question");
      }
    }
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
      <Typography
        sx={{ fontSize: "2rem", fontWeight: "bold", pb: 2, borderBottom: "2px solid #f0f0f0" }}
        component="h1"
      >
        Ask a Question
      </Typography>
      <TextField
        label="Your Comment"
        onChange={(e) => setInputValue(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px" }}
      />
      <AskButton
        text="Comment"
        sx={{
          fontSize: "12px",
          padding: "10px 20px",
          backgroundColor: "#007acc",
          color: "#fff",
          '&:hover': {
            backgroundColor: " #005c99",
          },
        }}
        onClick={handleSendData}
      />
    </Box>
  );
};
export default Askques;
