import userApi from "@/apis/user";
import ico_level from "@/assets/images/ico_level_default.png";
import ProfileImage from "@/components/ProfileImage";
import { useLoading } from "@/contexts/LoadingContext";
import userLevel from "@/utils/calculateUserLevel";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Users.module.scss";

const Users = () => {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.pathname.split("/")[2];

  const [userInfo, setUserInfo] = useState({
    id: 0,
    nickname: "",
    profile: "",
    level: 0,
  });

  useEffect(() => {
    showLoading();
    const getUser = async () => {
      const response: any = await userApi.getUserInfoForPublic(nickname);
      if (response.status === 404) {
        hideLoading();
        navigate("/404");
      }
      const { level } = userLevel(response.point) || { level: 1 };
      setUserInfo({ ...response.data, level: level });
    };
    getUser();
    hideLoading();
  }, []);
  console.log(userInfo);

  return (
    userInfo.id > 0 && (
      <div className={styles.wrap}>
        <div className={styles.nav_wrap}>
          <h5>작성한 글/댓글</h5>
        </div>
        <div className={styles.main}>
          <div className={styles.profile}>
            <span className="tab_show">{userInfo.nickname}</span>
            <ProfileImage src={userInfo.profile} />
            <span className="mo_show">{userInfo.nickname}</span>
            <img className={styles.level_image} src={ico_level} alt="level" />
            <span style={{ display: "flex" }}>
              <span className="tab_show" style={{ marginRight: "4px" }}>
                NEEDU 커뮤니티
              </span>{" "}
              level {userInfo.level}
            </span>
          </div>
          <div className={styles.content_wrap}>
            <ul>
              <li className={styles.item}>
                <h5>123</h5>
              </li>
              <li className={styles.item}>
                <h5>123</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default Users;
