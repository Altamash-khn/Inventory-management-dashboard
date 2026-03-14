import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/signupForm.jsx";
import ProductForm from "./pages/Products.jsx";
import HomePage from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/HomePage" />} />x  x

      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/products" element={<ProductForm/>} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
