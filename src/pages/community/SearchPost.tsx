import React from "react";
import styles from "./Search.module.scss";
import { Link } from "react-router-dom";
import ico_pencil from "@/assets/images/btn_write_modal.png";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";

const SearchPost = ({ type }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.topic_wrap}>
          <div className={styles.post_type}>
            <h5>커뮤니티 &gt; </h5>
            <h5>질문&답변</h5>
          </div>
          <div className={styles.post_topic}>
            <button className={styles.select}>
              <h5>전체</h5>
            </button>
            <button>
              <h5>전체</h5>
            </button>
            <button>
              <h5>커리어</h5>
            </button>
            <button>
              <h5>기타</h5>
            </button>
          </div>
        </div>
        <div className={styles.search_wrap}>
          <input type="text" placeholder="검색어를 입력해주세요" />
          <div>
            <button className={`mo_show ${styles.btn_to_write}`}>
              <Link to="">
                <img src={ico_pencil} alt="to_write" />
              </Link>
            </button>
            <button className={styles.btn_search}>검색</button>
            <button className={`tab_show ${styles.btn_to_write}`}>
              <Link to="">
                <img src={ico_pencil} alt="to_write" />
              </Link>
            </button>
          </div>
        </div>
        <div className={styles.sort_wrap}>
          <select>
            <option>최신순</option>
            <option>조회순</option>
          </select>
        </div>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.notice}>
          <div className={`body2 ${styles.label}`}>공지</div>
          <div className={styles.notice_content}>
            <div className={styles.info}>
              <img src={ico_profile} alt="profile_image" />
              <span className={`body2`}>
                닉네임
                <img
                  src={ico_level}
                  alt="레벨"
                  style={{ width: "16px", marginLeft: "4px" }}
                />
              </span>
              <span className={`caption`} style={{ color: "#aaa" }}>
                30분전
              </span>
              <span className={`caption`} style={{ color: "#aaa" }}>
                <img
                  src={ico_view}
                  alt="views"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "2px",
                  }}
                />
                5,000
              </span>
            </div>
            <h5 className={styles.title}>
              이영역은 제목입니다. 최대 30자로 예상합니다.
            </h5>
            <div className={styles.content}>
              이 영역은 본문글입니다. 최대 2줄까지만 노출하려고 합니다. 최대
              2줄까지만 노출하려고 합니다.
            </div>
            <div className={styles.reaction}>
              <span className={`body2`} style={{ color: "#aaa" }}>
                <img src={ico_like} alt="like" style={{ width: "16px" }} />0
              </span>
              <span className={`body2`} style={{ color: "#aaa" }}>
                <img src={ico_reply} alt="reply" style={{ width: "20px" }} />0
              </span>
            </div>
          </div>
        </div>
        <ul>
          <li></li>
        </ul>
      </div>
      <div>페이지네이션</div>
    </div>
  );
};

export default SearchPost;
