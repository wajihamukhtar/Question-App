import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllQuestion from '../components/AllQuestion'
import QuestionComponent from '../components/QuestionComponent'
import AskQues from '../pages/AskQues'


const AppRouter = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllQuestion/>}> </Route>
      <Route path="/QuestionComponent/:id" element={<QuestionComponent/>}></Route>
      <Route path="/AskQues" element={<AskQues/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default AppRouter
