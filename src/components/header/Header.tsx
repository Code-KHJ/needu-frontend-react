import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [name, setName] = useState("");
  const [isMenuShow, setMenuShow] = useState(false);

  const toggleMenu = () => {
    setMenuShow(!isMenuShow);
  };

  const handleResize = () => {
    const winResize = window.innerWidth;
    if (winResize >= 768) {
      setMenuShow(false);
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

  useEffect(() => {
    setName("");
  }, []);

  return (
    <header>
      <div
        className={`${styles.bg_white} ${isMenuShow ? styles.show : ""}`}
      ></div>
      <div className={styles.header_wrap}>
        <Link to="/" className={`blind ${styles.logo}`}>
          logo
        </Link>
        <div className={styles.nav_wrap}>
          <div className={`${styles.btn_ham_gnb} blind`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={`${isMenuShow ? styles.show : ""}`}>
            <div className={styles.gnb_wrap}>
              <ul className={styles.gnb}>
                <li>
                  <Link to="/review/search">기관리뷰</Link>
                </li>
                <li>
                  <Link to="/review/write">리뷰작성</Link>
                </li>
                <li className={styles.beta}>
                  <a href="https://needu.oopy.io">니쥬챗</a>
                  <img src="src/assets/images/ico_beta.png" />
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
              {name ? (
                <>
                  <Link to="/mypage/profile" className={styles.nickname}>
                    {name}님
                  </Link>
                  <Link to="/logout" className={styles.logout}>
                    <span>로그아웃</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.login}>
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
