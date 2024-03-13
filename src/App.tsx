import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css"
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Findid from "./pages/findIdPw/Findid";
import Findpw from "./pages/findIdPw/Findpw";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find/id" element={<Findid />} />
        <Route path="/find/pw" element={<Findpw />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
