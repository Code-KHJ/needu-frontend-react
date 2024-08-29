import React from "react";
import styles from "../Search.module.scss";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_reply_accepted from "@/assets/images/ico_reply_accepted.png";
import { PostListItemContent } from "@/interface/Community";
import agoDate from "@/utils/agoDate";
import stripHtml from "@/utils/stripHtml";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";

interface PostItemProps {
  post: PostListItemContent;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.post_content}>
      <div className={styles.info}>
        <img src={ico_profile} alt="profile_image" />
        <span className={`body2`}>
          {post.writer.nickname}
          <img
            src={ico_level}
            alt="레벨"
            style={{ width: "16px", marginLeft: "4px" }}
          />
        </span>
        <span className={`caption`} style={{ color: "#aaa" }}>
          {agoDate(post.created_at)}
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
          {post.view}
        </span>
      </div>
      <h5
        className={styles.title}
        onClick={() =>
          navigate(`${location.pathname}/${post.id}`, {
            state: { previous: location.pathname + location.search },
          })
        }
      >
        {post.title}
      </h5>
      <div className={styles.content}>{stripHtml(post.content)}</div>
      <div className={styles.reaction}>
        <span className={`body2`} style={{ color: "#aaa" }}>
          <img src={ico_like} alt="like" style={{ width: "16px" }} />
          {post.like_cnt}
        </span>
        <span
          className={`body2`}
          style={
            post.commentAccepted ? { color: "#6269F5" } : { color: "#aaa" }
          }
        >
          <img
            src={post.commentAccepted ? ico_reply_accepted : ico_reply}
            alt="reply"
            style={{ width: "20px" }}
          />
          {post.comment_cnt}
        </span>
      </div>
    </div>
  );
};

export default PostItem;
