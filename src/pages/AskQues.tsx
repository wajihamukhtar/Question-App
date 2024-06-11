import { Box,  Button,  TextField,  Typography } from "@mui/material";
import { useState } from "react";
import app from '../config/firebaseConfig'
import {getDatabase,push,set,ref} from 'firebase/database'
import { useNavigate } from "react-router-dom";

const AskQues = () => {
  const [InputValue, setInputValue] = useState<any>("");
  const navigate = useNavigate();

const sendData=()=>{
 if (InputValue==='') {
  alert('Enter Comment')
 }
 else{
   const db=getDatabase(app)
   const newData=push(ref(db,'question'))
   set(newData,{
     question:InputValue
     }
     )
     .then(()=>{
       navigate('/')
       alert('sendData sucussfully')
    })
    }
 } 
  return (
 
      <Box sx={{ borderRadius: '5px', boxShadow: '1px 3px 2px 2px gray', width: '75%', margin: 'auto', marginTop: '50px', padding: '20px' }}>
        <Typography sx={{ fontSize: '30px',paddingBottom:'20px' }} component={'h1'}>Ask a Question</Typography>
        <TextField label="Your Comment" onChange={(e)=>{setInputValue(e.target.value)}} variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
        <Button onClick={sendData} value={InputValue} variant="contained" color="primary">Comment</Button>
      </Box>
    );
  };


export default AskQues;
