import ico_email from "@/assets/images/ico_email.svg";
import ico_fb from "@/assets/images/ico_facebook.svg";
import ico_insta from "@/assets/images/ico_instagram.svg";
import ico_kakao from "@/assets/images/ico_kakao.svg";
import ico_phone from "@/assets/images/ico_phone.svg";
import { useState } from "react";
import SubscribeModal from "../modal/SubscribeModal";
import styles from "./Footer.module.scss";

const Footer = () => {
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const onClickCancel = () => {
    setSubscribeModalOpen(false);
  };

  return (
    <footer>
      <div className={styles.footer_wrap}>
        <div className={styles.footer_terms}>
          <div>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-2024-10-00-3690cfa0ab124c1a86cf46cde92b1aa2?pvs=4"
              target="_blank"
              className="caption"
            >
              이용약관
            </a>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/d262bf0970b143fa97cfb93552a1b33f"
              target="_blank"
              className="caption"
            >
              개인정보처리방침
            </a>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-d7cb722b6a6247d38594aff27c31c036?pvs=4"
              target="_blank"
              className="caption"
            >
              커뮤니티 운영가이드
            </a>
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/NeedU-2323fd6cf25042c28a5b9fb0029d67ce?pvs=4"
              target="_blank"
              className="caption"
            >
              <strong>NEEDU 소개</strong>
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
                <img src={ico_fb} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/needu.sw/" target="_blank">
                <img src={ico_insta} alt="Instagram" />
              </a>
              <a href="http://pf.kakao.com/_CsYKG" target="_blank">
                <img src={ico_kakao} alt="Kakao" />
              </a>
            </div>
          </div>
          <div className={styles.footer_contact}>
            <span>NEEDU</span>
            <span>대표 김현준</span>
            <span>사업자 등록번호 197-07-02539</span>
            <span className={styles.contact_email}>
              <img src={ico_email} alt="Email" />
              needu.sw@gmail.com
            </span>
            <span className={styles.contact_phone}>
              <img src={ico_phone} alt="Telephone" />
              070-7954-4468
            </span>
          </div>
          <div className="caption">
            문의가 있으신가요?&nbsp;&nbsp;
            <strong>
              <a
                className="caption"
                style={{ cursor: "pointer" }}
                href="http://pf.kakao.com/_CsYKG"
                target="_blank"
              >
                카카오톡채널 바로가기
              </a>
            </strong>
          </div>
        </div>
      </div>
      <SubscribeModal
        modalOpen={subscribeModalOpen}
        onClickCancel={onClickCancel}
      />
    </footer>
  );
};

export default Footer;
