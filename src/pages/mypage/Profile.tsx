import ico_arrow_down from "@/assets/images/ico_arrow_down.png";
import ico_help from "@/assets/images/ico_help.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_profile from "@/assets/images/ico_login_gray.png";
import { useEffect, useState } from "react";
import styles from "./Mypage.module.scss";

const Profile = () => {
  const value = Math.min((250 / 499) * 100, 100);
  const [expandActivity, setExpandActivity] = useState(false);
  const handleExpand = () => {
    setExpandActivity(!expandActivity);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 768) {
      setExpandActivity(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.profile_wrap}>
      <div className={styles.user_info}>
        <div className={styles.info}>
          <span className="body2 tab_show">홍길동</span>
          <img
            className={styles.profile_image}
            src={ico_profile}
            alt="profile_image"
          />
          <span className={styles.nickname}>홍길동</span>
          <img className={styles.level_imamge} src={ico_level} alt="level" />
          <span>{windowWidth > 768 && "NEEDU 커뮤니티 "}Level 2</span>
        </div>
        <div className={styles.gauge}>
          <div
            style={{
              backgroundColor: "#d9d9d9",
              width: "100%",
              height: "8px",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <span
              style={{
                backgroundColor: "#6269f5",
                borderRadius: `${value === 100 ? "5px" : "5px 0 0 5px"}`,
                width: `${value}%`,
                height: "8px",
                position: "absolute",
              }}
            ></span>
          </div>
          <div className={styles.range}>
            <span className="body2">200</span>
            <span className="body2">499</span>
          </div>
        </div>
      </div>
      {windowWidth < 768 && (
        <button onClick={handleExpand}>
          <img
            src={ico_arrow_down}
            alt="더보기"
            style={{
              width: "16px",
              transform: expandActivity ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
      )}
      {(expandActivity || windowWidth >= 768) && (
        <div className={styles.activity}>
          <div className={styles.title}>
            <h5>활동기록</h5>
            <a href="" target="_blank">
              <img
                src={ico_help}
                alt="help"
                style={{ width: "16px", height: "16px" }}
              />
            </a>
          </div>
          <div className={styles.content}>
            <ul>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
              <li>
                <span>계정 생성</span>
                <span>1</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
