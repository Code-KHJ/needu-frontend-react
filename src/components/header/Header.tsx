import userApi from "@/apis/user";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import ProfileImage from "../ProfileImage";

const Header = () => {
  //@ts-ignore
  const { user } = useUser();
  const [isMenuShow, setMenuShow] = useState(false);

  const toggleMenu = () => {
    setMenuShow(!isMenuShow);
    setToggle({
      review: false,
      community: false,
    });
  };

  const handleResize = () => {
    const winResize = window.innerWidth;
    if (winResize >= 1024) {
      setMenuShow(false);
      setToggle({ review: false, community: false });
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();
  useEffect(() => {
    setMenuShow(false);
  }, [location.pathname]);

  const logout = async () => {
    localStorage.removeItem("userInfo");
    const response: any = await userApi.logout();
    if (response.status == 200) {
      alert("로그아웃 되었습니다.");
      window.location.href = "/";
    } else {
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    }
  };

  const [toggle, setToggle] = useState<{ review: boolean; community: boolean }>(
    {
      review: false,
      community: false,
    }
  );
  useEffect(() => {
    setToggle({ review: false, community: false });
  }, []);

  type ToggleType = "review" | "community";

  const handleToggle = (type: ToggleType) => {
    setToggle((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <header>
      <div
        className={`${styles.bg_white} ${isMenuShow ? styles.show : ""}`}
      ></div>
      <div className={styles.header_wrap}>
        <Link
          to="/"
          className={`blind ${styles.logo}`}
          style={isMenuShow ? { width: "0px" } : {}}
        >
          logo
        </Link>
        <div
          className={styles.nav_wrap}
          style={isMenuShow ? { width: "100%" } : {}}
        >
          <div className={`${styles.btn_ham_gnb} blind`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={`${isMenuShow ? styles.show : ""}`}>
            <div className={styles.gnb_wrap}>
              <ul className={styles.gnb}>
                <li
                  className={styles.parent_li}
                  onMouseEnter={() =>
                    window.innerWidth >= 1024 && handleToggle("review")
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 1024 && handleToggle("review")
                  }
                >
                  <Link
                    className={`${styles.pc} ${styles.parent}`}
                    to="/review/search/working?region=&corp_name=&score=&hashtags=&order=avg&page=1"
                  >
                    기관리뷰
                  </Link>
                  <div
                    className={`${styles.mo} ${styles.parent} ${
                      toggle.review ? styles.expand : ""
                    }`}
                    onClick={() => handleToggle("review")}
                  >
                    기관리뷰
                  </div>
                  <div
                    className={styles.child}
                    style={toggle.review ? {} : { display: "none" }}
                  >
                    <Link to="/review/search/working?region=&corp_name=&score=&hashtags=&order=avg&page=1">
                      전현직리뷰
                    </Link>
                    <div></div>
                    <Link to="review/search/training?region=&corp_name=&score=&number_of_participants=&cost=&duration=&order=avg&page=1">
                      실습리뷰
                    </Link>
                  </div>
                </li>
                <li
                  className={styles.parent_li}
                  onMouseEnter={() =>
                    window.innerWidth >= 1024 && handleToggle("community")
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 1024 && handleToggle("community")
                  }
                >
                  <Link
                    className={`${styles.pc} ${styles.parent}`}
                    to="/community"
                  >
                    커뮤니티
                  </Link>
                  <div
                    className={`${styles.mo} ${styles.parent} ${
                      toggle.community ? styles.expand : ""
                    }`}
                    onClick={() => handleToggle("community")}
                  >
                    커뮤니티
                  </div>
                  <div
                    className={styles.child}
                    style={toggle.community ? {} : { display: "none" }}
                  >
                    <Link to="/community/free?type=1&topic=0&search=&order=recent&page=1">
                      자유게시판
                    </Link>
                    <div></div>
                    <Link to="/community/question?type=2&topic=0&search=&order=recent&page=1">
                      질문&답변
                    </Link>
                  </div>
                </li>
                <li>
                  <a href="https://needu.oopy.io">니쥬챗</a>
                </li>
                <li>
                  <Link to="/subscribe">NEEDU레터</Link>
                </li>
                <li>
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/NeedU-2323fd6cf25042c28a5b9fb0029d67ce?pvs=4"
                    target="_blank"
                  >
                    NEEDU소개
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.usersign}>
              {user.nickname !== null ? (
                <>
                  <Link to="/mypage" className={styles.nickname}>
                    <ProfileImage src={user.profile_image} />
                    {user.nickname}님
                  </Link>
                  <span className={styles.logout} onClick={logout}>
                    로그아웃
                  </span>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={styles.login}
                    state={{ from: location.pathname }}
                  >
                    로그인
                  </Link>
                  <Link to="/signup" className={styles.signup}>
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
