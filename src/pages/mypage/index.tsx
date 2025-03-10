import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import styles from "./Mypage.module.scss";
import Nav from "./Nav";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { UserProfile } from "@/interface/User";
import userApi from "@/apis/user";
import Community from "./Community";
import Review from "./Review";

interface MypageRoutesProps {
  isLogin: boolean;
}
const MypageRoutes: React.FC<MypageRoutesProps> = ({ isLogin }) => {
  const location = useLocation();
  const previousPage = location.pathname + location.search;
  const [userInfo, setUserInfo] = useState<UserProfile>({
    user_id: "",
    nickname: "",
    phonenumber: "",
    google: false,
    kakao: false,
    profile_image: "",
    activity_points: 0,
  });

  const getUserInfo = async () => {
    const response: any = await userApi.getUserInfo();
    if (response.status !== 200) {
      alert("오류가 발생하였습니다");
      window.location.reload();
    }
    setUserInfo(response.data);
  };

  useEffect(() => {
    if (isLogin) {
      getUserInfo();
    }
  }, []);

  return isLogin ? (
    <div className={styles.wrap}>
      <Nav />
      <div className={styles.content_wrap}>
        <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/info"
            element={<Info userInfo={userInfo} setUserInfo={setUserInfo} />}
          />
          <Route path="/free" element={<Community userInfo={userInfo} />} />
          <Route path="/question" element={<Community userInfo={userInfo} />} />
          <Route path="working" element={<Review />} />
          <Route path="training" element={<Review />} />
        </Routes>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ previous: previousPage }} replace />
  );
};

export default MypageRoutes;
