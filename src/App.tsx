import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Findid from './pages/findIdPw/Findid';
import Findpw from './pages/findIdPw/Findpw';
import ScrollToTop from './components/ScrollToTop';
import { useUser } from './contexts/UserContext';
import { useEffect, useState } from 'react';
import userApi from './apis/user';
import WriteTraining from './pages/review/WriteTraining';

function App() {
  const { user, setUser } = useUser();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (user.id == null) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo !== null) {
          const userData = JSON.parse(userInfo);
          setUser({ id: userData.id, nickname: userData.nickname });
          setIsLogin(true);
        } else {
          const response = await userApi.getMe();
          if (response.status == 200) {
            setUser({ id: response.data.id, nickname: response.data.nickname });
            setIsLogin(true);
            localStorage.setItem(
              'userInfo',
              JSON.stringify({
                id: response.data.id,
                nickname: response.data.nickname,
              })
            );
          } else {
            setUser({ id: null, nickname: null });
            setIsLogin(false);
          }
        }
      }
    };
    fetchData();
  }, [user.id, setUser]);

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
        <Route
          path="/review/write/training"
          element={isLogin ? <Navigate to="/" /> : <WriteTraining />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
