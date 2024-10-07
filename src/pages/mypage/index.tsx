import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import styles from "./Mypage.module.scss";
import Nav from "./Nav";
import Profile from "./Profile";

const MypageRoutes = () => {
  return (
    <div className={styles.wrap}>
      <Nav />
      <div className={styles.content_wrap}>
        <Profile />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
};

export default MypageRoutes;
