import ico_arrow_down from "@/assets/images/ico_arrow_down.png";
import ico_help from "@/assets/images/ico_help.png";
import ico_level from "@/assets/images/ico_level_default.png";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Mypage.module.scss";
import ProfileImage from "@/components/ProfileImage";
import { HookCallback } from "node_modules/@toast-ui/editor/types/editor";
import userApi from "@/apis/user";
import { UserProfile } from "@/interface/User";

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
    getUserInfo();
  }, []);

  const profileInput = useRef<HTMLInputElement | null>(null);
  const changeProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name;
      const blob = new Blob([file], { type: file.type });

      await handleImage(
        blob,
        fileName,
        (imageUrl: string, type: string | undefined) => {
          if (imageUrl) {
            setUserInfo((prevInfo) => ({
              ...prevInfo,
              profile_image: imageUrl,
            }));

            const localStorageData = localStorage.getItem("userInfo");
            const userInfoInLocalStorage = JSON.parse(
              localStorageData as string
            );
            userInfoInLocalStorage.profile_image = imageUrl;
            localStorage.setItem(
              "userInfo",
              JSON.stringify(userInfoInLocalStorage)
            );
          }
          console.log(type);
        }
      );
    }
  };
  const handleImage = useCallback(
    async (blob: Blob, filename: string, callback: HookCallback) => {
      const formData = new FormData();
      formData.append("image", blob, filename);

      try {
        const response: any = await userApi.uploadProfile(formData);

        if (response.status !== 201) {
          if (response.status === 413) {
            alert("파일 용량이 5MB를 초과하여 업로드에 실패하였습니다.");
            return;
          } else {
            alert("오류가 발생했습니다.");
            return;
          }
        }
        const imageUrl = response.data.imageUrl;
        callback(imageUrl, "image");
      } catch (error) {
        console.error("이미지 업로드 오류:", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    },
    []
  );

  return (
    <div className={styles.profile_wrap}>
      <div className={styles.user_info}>
        <div className={styles.info}>
          <span className="body2 tab_show">홍길동</span>
          <span
            className={styles.profile}
            onClick={() => {
              profileInput.current!.click();
            }}
          >
            <ProfileImage src={userInfo.profile_image} />
            <input
              type="file"
              accept=".jpg, .jpeg, .png, image/jpg, image/png, image/jpeg"
              onChange={changeProfileImage}
              ref={profileInput}
              style={{ display: "none" }}
            />
          </span>
          <span className={styles.nickname}>{userInfo.nickname}</span>
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
