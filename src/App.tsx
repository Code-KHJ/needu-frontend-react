import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Findid from "./pages/findIdPw/Findid";
import Findpw from "./pages/findIdPw/Findpw";
import ScrollToTop from "./components/ScrollToTop";
import { useUser } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import ReviewRoutes from "./pages/review";

function App() {
  const { user, loading } = useUser();
  const isLogin = user.id !== null;

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/find/id"
          element={isLogin ? <Navigate to="/" /> : <Findid />}
        />
        <Route
          path="/find/pw"
          element={isLogin ? <Navigate to="/" /> : <Findpw />}
        />
        <Route path="/review/*" element={<ReviewRoutes isLogin={isLogin} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
