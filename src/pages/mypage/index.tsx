import { Route, Routes } from "react-router-dom";
import styles from "./Mypage.module.scss";
import Nav from "./Nav";
import Profile from "./Profile";
import Home from "./Home";

const MypageRoutes = () => {
  return (
    <div className={styles.wrap}>
      <Nav />
      <div className={styles.content_wrap}>
        <Profile />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default MypageRoutes;
