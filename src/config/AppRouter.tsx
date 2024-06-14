import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllQuestion from '../components/AllQuestion'
import QuestionComponent from '../components/QuestionComponent'
import Askques from '../pages/Askques'



const AppRouter = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllQuestion/>}> </Route>
      <Route path="/QuestionComponent/:id" element={<QuestionComponent/>}></Route>
      <Route path="/Askques" element={<Askques/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default AppRouter
