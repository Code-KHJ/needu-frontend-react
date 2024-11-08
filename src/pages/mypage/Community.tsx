import communityApi from "@/apis/community";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_reply_accepted from "@/assets/images/ico_reply_accepted.png";
import ico_view from "@/assets/images/ico_view.png";
import { useLoading } from "@/contexts/LoadingContext";
import { PostContent } from "@/interface/Community";
import { UserProfile } from "@/interface/User";
import stripHtml from "@/utils/stripHtml";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Mypage.module.scss";

interface CommunityProps {
  userInfo: UserProfile;
}

const Community: React.FC<CommunityProps> = ({ userInfo }) => {
  const { showLoading, hideLoading, isLoading } = useLoading();
  const location = useLocation();
  const communityType = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [postList, setPostList] = useState<PostContent[]>([]);

  useEffect(() => {
    showLoading();
    const getPost = async () => {
      const response: any = await communityApi.getPostListByUser();
      if (response.status !== 200) {
        hideLoading();
        navigate("/error");
      }
      //@ts-ignore
      const filteredType = response.data.filter((item) =>
        communityType === "free"
          ? item.postType === "자유게시판"
          : item.postType === "질문&답변"
      );
      setPostList(filteredType);
    };
    getPost();
    hideLoading();
  }, [communityType, userInfo]);

  return (
    <div className={styles.community_wrap}>
      <ul className={styles.post_list}>
        {postList.map((post) => (
          <li className={styles.post_item} key={post.id}>
            <h5
              className={styles.title}
              onClick={() =>
                navigate(`/community/${communityType}/${post.id}`, {
                  state: { previous: location.pathname },
                })
              }
            >
              {post.weeklyBest ? (
                <span
                  style={{
                    color: "#fafafa",
                    background: "#6269f5",
                    borderRadius: "3px",
                    padding: "0 6px",
                    marginRight: "8px",
                  }}
                >
                  Best
                </span>
              ) : (
                ""
              )}
              {post.title}
            </h5>
            <div
              className={styles.content}
              onClick={() =>
                navigate(`/community/${communityType}/${post.id}`, {
                  state: { previous: location.pathname },
                })
              }
            >
              {stripHtml(post.content)}
            </div>
            <div className={styles.reaction_wrap}>
              <div className={`body2 ${styles.date}`}>
                {new Date(post.created_at)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, ".")}
              </div>
              <div className={styles.reaction}>
                {post.commentAccepted && (
                  <span
                    className={`body2 ${styles.accepted}`}
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
                  {post.postLikes.length}
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img src={ico_reply} alt="reply" style={{ width: "20px" }} />
                  {post.comment_cnt}
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img src={ico_view} alt="reply" style={{ width: "20px" }} />
                  {post.view}
                </span>
              </div>
            </div>
          </li>
        ))}
        {!isLoading && postList.length === 0 && (
          <li className={styles.post_item} style={{ height: "200px" }}>
            <div className={styles.post_none}>
              <p>작성한 글이 없습니다. 첫 글을 남겨보세요!</p>
              <button
                type="button"
                onClick={() => navigate(`/community/${communityType}/`)}
              >
                글 남기러 가기
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Community;
