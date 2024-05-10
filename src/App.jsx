import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/landing"
import SignIn from "./pages/signIn"
import SignUp from "./pages/signUp"
import History from "./pages/history"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ChatAi from "./pages/chatAi"
// import { Provider } from "react-redux"


function App() {
  return (
    <div>
      
        <Router>
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/history" element={<History />}/>
            <Route path="/chatai" element={<ChatAi/>} />
          </Routes>
        </Router>
        <ToastContainer />
      
      {/* <Landing /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <History /> */}
    </div>
  )
}

export default App
