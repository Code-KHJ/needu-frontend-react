import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Mypage.module.scss";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuList: { [key: string]: string } = {
    홈: "/",
    전현직리뷰: "/working",
    실습리뷰: "/training",
    자유게시판: "/free",
    "질문&답변": "/question",
    정보수정: "/info",
  };
  const [menu, setMenu] = useState("");
  const handleMenu = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const { value } =
      e.nativeEvent instanceof MouseEvent
        ? e.currentTarget
        : (e.target as HTMLSelectElement);

    const path = menuList[value];
    navigate(`/mypage${path}`);
  };

  useEffect(() => {
    const path = location.pathname.replace("/mypage", "");
    const currentMenu =
      Object.entries(menuList).find(([_, value]) => value === path)?.[0] ||
      "홈";
    if (menu !== currentMenu) setMenu(currentMenu);
  }, [location.pathname]);

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
