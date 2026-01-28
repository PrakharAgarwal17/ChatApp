import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { SignIn } from "./pages/SignIn"
import AboutUs from "./pages/Aboutus"

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
        <Route path="/learnmore" element={
          <AboutUs></AboutUs>
        }></Route>
        
      </Routes>
    </Router>
    </>
  )
}

export default App
