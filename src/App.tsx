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
import ReviewRoutes from "./pages/review";
import CommunityRoutes from "./pages/community";
import NoticeRoutes from "./pages/notice";

function App() {
  //@ts-ignore
  const { user, loading } = useUser();
  const isLogin = user.id !== null;
  const isAdmin = user.authority === 100;
  if (loading) {
    return <div>Loading...</div>;
  }

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
        <Route
          path="/community/*"
          element={<CommunityRoutes isLogin={isLogin} />}
        />
        <Route path="/notice/*" element={<NoticeRoutes isAdmin={isAdmin} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
