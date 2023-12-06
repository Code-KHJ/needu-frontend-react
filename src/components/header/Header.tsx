import React, { useEffect, useState } from "react";
import "./Header.scss";

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

  useEffect(() => {
    setName("홍길동");
  }, []);

  return (
    <header>
      <div className={`back-white ${isMenuShow ? "show" : ""}`}></div>
      <div className="header-wrap">
        <a href="/" className="blind logo">
          logo
        </a>
        <div className="nav_wrap">
          <div className="btn_ham_gnb blind" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={`${isMenuShow ? "show" : ""}`}>
            <div className="gnb_wrap">
              <ul className="gnb">
                <li>
                  <a href="/review/search">기관리뷰</a>
                </li>
                <li>
                  <a href="/review/write">리뷰작성</a>
                </li>
                <li className="beta">
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
            <div className="usersign">
              {name ? (
                <>
                  <a href="/mypage/profile" className="nickname">
                    {name}님
                  </a>
                  <a href="/logout" className="logout">
                    <span>로그아웃</span>
                  </a>
                </>
              ) : (
                <>
                  <a href="/login" className="login">
                    로그인
                  </a>
                  <a href="/signup" className="signup">
                    회원가입
                  </a>
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
