import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/signupForm.jsx";

function App() {
  return (
    <Routes>
      {/* default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
