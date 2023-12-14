import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_wrap}>
        <div className={styles.footer_terms}>
          <div>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-2023-11-20-deb19b729f214bddbbbaf636cf14652d?pvs=4"
              target="_blank"
            >
              이용약관
            </a>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/d262bf0970b143fa97cfb93552a1b33f"
              target="_blank"
            >
              개인정보처리방침
            </a>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-d7cb722b6a6247d38594aff27c31c036?pvs=4"
              target="_blank"
            >
              커뮤니티 운영가이드
            </a>
          </div>
        </div>
        <div className={styles.footer_info}>
          <div className={styles.footer_ico}>
            <div className={styles.footer_logo}></div>
            <div className={styles.ico_sns}>
              <a
                href="https://www.facebook.com/people/%EC%82%AC%ED%9A%8C%EB%B3%B5%EC%A7%80-%EA%B8%B0%EA%B4%80%EB%A6%AC%EB%B7%B0-%ED%94%8C%EB%9E%AB%ED%8F%BC-NEEDU/61550193057323/"
                target="_blank"
              >
                <img src="src/assets/images/ico_facebook.svg" />
              </a>
              <a href="https://www.instagram.com/needu.sw/" target="_blank">
                <img src="src/assets/images/ico_instagram.svg" />
              </a>
              <a href="http://pf.kakao.com/_CsYKG" target="_blank">
                <img src="src/assets/images/ico_kakao.svg" />
              </a>
            </div>
          </div>
          <div className={styles.footer_contact}>
            <span>NEEDU</span>
            <span>대표 김현준</span>
            <span>사업자 등록번호 197-07-02539</span>
            <span className={styles.contact_email}>
              <img src="src/assets/images/ico_email.svg" />
              needu.sw@gmail.com
            </span>
            <span className={styles.contact_phone}>
              <img src="src/assets/images/ico_phone.svg" />
              070-7954-4468
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
