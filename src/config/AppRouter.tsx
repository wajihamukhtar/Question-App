import { BrowserRouter, Route, Routes } from "react-router-dom"
import AskQuestion from "../pages/askQuestion"
import AllQuestion from "../components/AllQuestion"
import QuestionComponent from "../components/QuestionComponent"

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllQuestion/>}></Route>
        <Route path="/QuestionComponent/:id" element={<QuestionComponent/>}></Route>
        <Route path="/AskQuestion" element={<AskQuestion/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
