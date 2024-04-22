import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import userApi from '@/apis/user';

const Header = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user.id == null) {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo !== null) {
          const userData = JSON.parse(userInfo);
          console.log(userData);
          setUser({ id: userData.id, nickname: userData.nickname });
        } else {
          const response = await userApi.getMe();
          console.log(response);
          if (response.status == 200) {
            setUser({ id: response.data.id, nickname: response.data.nickname });
            localStorage.setItem(
              'userInfo',
              JSON.stringify({
                id: response.data.id,
                nickname: response.data.nickname,
              })
            );
          } else {
            setUser({ id: null, nickname: null });
          }
        }
      }
    };
    fetchData();
  }, [user.id, setUser]);

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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const location = useLocation();
  useEffect(() => {
    setMenuShow(false);
  }, [location.pathname]);

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('userInfo');
    const response = await userApi.logout();
    if (response.status == 200) {
      window.location.href = '/';
    } else {
      alert('문제가 발생했습니다. 다시 시도해주세요.');
      return;
    }
  };

  return (
    <header>
      <div
        className={`${styles.bg_white} ${isMenuShow ? styles.show : ''}`}
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
          <nav className={`${isMenuShow ? styles.show : ''}`}>
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
              {user.nickname !== null ? (
                <>
                  <Link to="/mypage/profile" className={styles.nickname}>
                    {user.nickname}님
                  </Link>
                  <span className={styles.logout} onClick={logout}></span>
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
