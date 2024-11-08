import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_reply_accepted from "@/assets/images/ico_reply_accepted.png";
import ico_view from "@/assets/images/ico_view.png";
import ProfileImage from "@/components/ProfileImage";
import { PostListItemContent } from "@/interface/Community";
import agoDate from "@/utils/agoDate";
import userLevel from "@/utils/calculateUserLevel";
import stripHtml from "@/utils/stripHtml";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Search.module.scss";

interface PostItemProps {
  post: PostListItemContent;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.post_item_wrap}>
      {Number(post.postType) === 2 && (
        <div
          className={`${styles.question_reply} pc_show_1024`}
          onClick={() =>
            navigate(`${location.pathname}/${post.id}`, {
              state: { previous: location.pathname + location.search },
            })
          }
        >
          {Number(post.comment_cnt) === 0 ? (
            <div className={styles.cnt_zero}>
              <h2>
                답변
                <br />
                하기
              </h2>
            </div>
          ) : (
            <div
              className={`${styles.cnt} ${
                post.commentAccepted ? styles.accepted : ""
              }`}
            >
              <div className={`body2`}>답변</div>
              <div>
                <h2>{post.comment_cnt}</h2>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.post_content}>
        <div className={styles.info}>
          <ProfileImage src={post.writer.profile_image} />
          <span
            className={`body2`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/users/${post.writer.nickname}`)}
          >
            {post.writer.nickname}
            <img
              src={userLevel(post.writer.activity_points)?.icon}
              alt="레벨"
              style={{ width: "17px", marginLeft: "4px" }}
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
        <div
          className={styles.content}
          onClick={() =>
            navigate(`${location.pathname}/${post.id}`, {
              state: { previous: location.pathname + location.search },
            })
          }
        >
          {stripHtml(post.content)}
        </div>
        <div className={styles.reaction}>
          {post.commentAccepted && (
            <span
              className={`body2 ${styles.qna_reaction}`}
              style={{ color: "#6269f5" }}
            >
              <img
                src={ico_reply_accepted}
                alt="like"
                style={{ width: "16px" }}
              />
              답변채택
            </span>
          )}
          <span className={`body2`} style={{ color: "#aaa" }}>
            <img src={ico_like} alt="like" style={{ width: "16px" }} />
            {post.like_cnt}
          </span>
          <span
            className={`body2 ${
              Number(post.postType) === 2 && styles.qna_reaction
            }`}
            style={{ color: "#aaa" }}
          >
            <img src={ico_reply} alt="reply" style={{ width: "20px" }} />
            {post.comment_cnt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
