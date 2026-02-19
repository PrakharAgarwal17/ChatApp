import {Routes,Route } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { SignIn } from "./pages/SignIn"
import AboutUs from "./pages/Aboutus"
import {ForgotPassword} from "./pages/ForgetPassword"
import { CreateAccount } from "./pages/CreateAccount"
import { VerifyOtp } from "./pages/VerifyOtp"

function App() {

  return (
    <> 
      <Routes>
        <Route path="/" element={
          <Landing></Landing>
        }></Route>

        <Route path="/signin" element={
          <SignIn></SignIn>
        }></Route>

        <Route path="/forgotpassword" element={
          <ForgotPassword></ForgotPassword>
        }></Route>

        <Route path='/createaccount' element={
          <CreateAccount></CreateAccount>
        }></Route>
        
        <Route path="/learnmore" element={
          <AboutUs></AboutUs>
        }></Route>

        <Route path="/verifyOtp" element={
          <VerifyOtp></VerifyOtp>
        }></Route>
        
      </Routes>
    </>
  )
}

export default App
