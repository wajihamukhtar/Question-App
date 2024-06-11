// AllQuestion.tsx
import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import app from '../config/firebaseConfig';

interface Question {
  question: string;
}

const AllQuestion: React.FC = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    const db = getDatabase(app);
    const questionsRef = ref(db, 'question');
    try {
      const snapshot = await get(questionsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const questionsArray: Question[] = Object.values(data);
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
    navigate('/AskQues');
  };

  return (
    <Box sx={{borderRadius: '5px', boxShadow: '1px 3px 2px 2px gray', width: '75%', margin: 'auto', marginTop: '50px', padding: '20px' }}>
      <Box>
        <Typography sx={{ fontSize: '30px',paddingBottom:'20px' }} component={'h1'}>All Questions</Typography>
        <Typography component={'ol'}></Typography>
        {allQuestions.map((item, index) => (
          <Typography sx={{fontSize:'20px'}} key={index} component={'li'}>
            {item.question}
          </Typography>
        ))}
      </Box>
      <Button sx={{fontSize:'13px',marginTop:'30px'}} variant='contained' onClick={handleAskQuestion}>Ask Question</Button>
    </Box>
  );
};

export default AllQuestion;
