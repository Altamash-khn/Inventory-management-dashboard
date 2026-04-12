import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <Routes>
      <p>go to <Link to="/login">login</Link></p>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
