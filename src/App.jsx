import { Login } from "./components/Login"
import LoginPage from "./pages/Login"
import { Route, Routes  } from "react-router-dom"
function App() {

  return (
    
 <>
  
  <Routes>
     {/* <Route path="/" element={<LoginPage/>}/> */}
    <Route path="login" element={<LoginPage/>}/>
  </Routes>
 </>
  )
}

export default App
