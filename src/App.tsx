import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ScrollToTop from "./components/ScrollToTop";
import { useUser } from "./contexts/UserContext";
import Error from "./pages/common/Error";
import Home from "./pages/common/Home";
import NotFound from "./pages/common/NotFound";
import CommunityRoutes from "./pages/community";
import Findid from "./pages/findIdPw/Findid";
import Findpw from "./pages/findIdPw/Findpw";
import ResetPw from "./pages/findIdPw/ResetPw";
import Login from "./pages/login/Login";
import MypageRoutes from "./pages/mypage";
import Users from "./pages/mypage/Users";
import NoticeRoutes from "./pages/notice";
import ReviewRoutes from "./pages/review";
import Signup from "./pages/signup/Signup";
import Subscribe from "./pages/common/Subscribe";

declare global {
  interface Window {
    Kakao: any;
  }
}

function App() {
  //@ts-ignore
  const { user, loading } = useUser();
  const isLogin = user.id !== null;
  const isAdmin = user.authority === 100;

  if (loading) {
    return <div></div>;
  }
  if (window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_APP_KAKAO_JAVASCRIPT_KEY);
    }
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/reset/password/*" element={<ResetPw />} />
          <Route
            path="/review/*"
            element={<ReviewRoutes isLogin={isLogin} />}
          />
          <Route
            path="/community/*"
            element={<CommunityRoutes isLogin={isLogin} />}
          />
          <Route
            path="/notice/*"
            element={<NoticeRoutes isAdmin={isAdmin} />}
          />
          <Route
            path="/mypage/*"
            element={<MypageRoutes isLogin={isLogin} />}
          />
          <Route path="/users/*" element={<Users />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
