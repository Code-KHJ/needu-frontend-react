import React, { useEffect, useState } from "react";
import styles from "./Mypage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuList = {
    홈: "/",
    기관리뷰: "/working",
    실습리뷰: "/training",
    자유게시판: "/free",
    "Q&A게시판": "/question",
    정보수정: "/info",
  };
  const [menu, setMenu] = useState("");
  const handleMenu = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.nativeEvent instanceof MouseEvent) {
      const { value } = e.currentTarget;
      setMenu(value);
    } else {
      const { value } = e.target as HTMLSelectElement;
      setMenu(value);
    }
  };

  useEffect(() => {
    const path = location.pathname.replace("/mypage", "");
    const menu =
      Object.entries(menuList).find(([label, value]) => value === path)?.[0] ||
      "홈";
    setMenu(menu);
  }, []);
  useEffect(() => {
    const path =
      Object.entries(menuList).find(([label, value]) => label === menu)?.[1] ||
      "/";
    navigate(`/mypage${path}`);
  }, [menu]);
  return (
    <div className={styles.nav_wrap}>
      <select
        className={`subtitle ${styles.for_mo}`}
        name="menu"
        value={menu}
        onChange={handleMenu}
      >
        {Object.entries(menuList).map(([label, value]) => (
          <option key={value} value={label}>
            {label}
          </option>
        ))}
      </select>
      <div className={styles.for_tab}>
        {Object.entries(menuList).map(([label, value]) => (
          <button
            key={value}
            value={label}
            className={`subtitle ${menu === label ? styles.active : ""}`}
            onClick={handleMenu}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Nav;
