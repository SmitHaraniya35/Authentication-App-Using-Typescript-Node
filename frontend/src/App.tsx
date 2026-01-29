import './App.css'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
// import JoinRoom from "./pages/JoinRoom";
import ChatRoom from "./pages/ChatRoom";
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          {/* <Route path="/join" element={<JoinRoom/>}/> */}
          <Route path="/chat/:userId/:recipientId" element={<ChatRoom/>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App;
