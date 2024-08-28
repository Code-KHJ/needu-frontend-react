import React from "react";
import styles from "../Search.module.scss";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";

const PostItem = () => {
  return (
    <div className={styles.post_content}>
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
        이 영역은 본문글입니다. 최대 2줄까지만 노출하려고 합니다. 최대 2줄까지만
        노출하려고 합니다.
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
  );
};

export default PostItem;
