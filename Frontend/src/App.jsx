import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { SignIn } from "./pages/SignIn"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
          <Landing></Landing>
        }></Route>
        <Route path="/signin" element={
          <SignIn></SignIn>
        }></Route>
        
      </Routes>
    </Router>
    </>
  )
}

export default App
