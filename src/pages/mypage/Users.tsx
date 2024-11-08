import communityApi from "@/apis/community";
import userApi from "@/apis/user";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_reply_accepted from "@/assets/images/ico_reply_accepted.png";
import ico_view from "@/assets/images/ico_view.png";
import ProfileImage from "@/components/ProfileImage";
import { useLoading } from "@/contexts/LoadingContext";
import userLevel from "@/utils/calculateUserLevel";
import stripHtml from "@/utils/stripHtml";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Helmets from "../helmets";
import styles from "./Users.module.scss";

interface ContentList {
  type: string;
  id: number;
  title: string;
  content: string;
  post_type: number;
  created_at: Date;
  view: number;
  like_cnt: number;
  comment_cnt: number;
  wbAccepted: boolean;
  commentAccepted: boolean;
  post: {
    id: number;
    title: string;
    content: string;
    type: string;
  };
}

const Users = () => {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.pathname.split("/")[2];

  const [userInfo, setUserInfo] = useState({
    nickname: "",
    profile: "",
    level: 0,
    icon: "",
  });
  const [content, setContent] = useState<ContentList[]>([]);

  useEffect(() => {
    showLoading();
    const getUser = async () => {
      const response: any = await userApi.getUserInfoForPublic(nickname);
      if (response.status === 404) {
        hideLoading();
        navigate("/404");
      }
      const { level, icon } = userLevel(response.data.point) || { level: 1 };
      setUserInfo({ ...response.data, level: level, icon: icon });
      getPostAndComment(response.data.nickname);
    };
    const getPostAndComment = async (nickname: string) => {
      const response: any = await communityApi.getPostAndCommentByNickname(
        nickname
      );
      if (response.status === 404) {
        hideLoading();
        navigate("/404");
      }
      setContent(response.data);
    };
    getUser();
    hideLoading();
  }, []);
  console.log(userInfo);

  return (
    <>
      <Helmets
        title={`[${userInfo.nickname}]의 프로필 I 사회복지 커뮤니티 NEEDU`}
        description=""
      ></Helmets>
      {userInfo.nickname != "" && (
        <div className={styles.wrap}>
          <div className={styles.nav_wrap}>
            <h5>작성한 글/댓글</h5>
          </div>
          <div className={styles.main}>
            <div className={styles.profile}>
              <span className="tab_show">{userInfo.nickname}</span>
              <ProfileImage src={userInfo.profile} />
              <span className="mo_show">{userInfo.nickname}</span>
              <img
                className={styles.level_image}
                src={userInfo.icon}
                alt="level"
              />
              <span style={{ display: "flex" }}>
                <span className="tab_show" style={{ marginRight: "4px" }}>
                  NEEDU 커뮤니티
                </span>{" "}
                level {userInfo.level}
              </span>
            </div>
            <div className={styles.content_wrap}>
              <ul>
                {content
                  .sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                  )
                  .map((content, index) => (
                    <li className={styles.item} key={index}>
                      {content.type === "post" && (
                        <div>
                          <div className={styles.title_wrap}>
                            {content.wbAccepted ? (
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
                            <h5
                              className={styles.title}
                              onClick={() =>
                                navigate(
                                  `/community/${
                                    content.post_type === 1
                                      ? "free"
                                      : "question"
                                  }/${content.id}`
                                )
                              }
                            >
                              {content.title}
                            </h5>
                          </div>
                          <span
                            className={styles.content}
                            onClick={() =>
                              navigate(
                                `/community/${
                                  content.post_type === 1 ? "free" : "question"
                                }/${content.id}`
                              )
                            }
                          >
                            {stripHtml(content.content)}
                          </span>
                          <div className={styles.reaction_wrap}>
                            <div className={`body2 ${styles.date}`}>
                              {new Date(content.created_at)
                                .toISOString()
                                .slice(0, 10)
                                .replace(/-/g, ".")}
                            </div>
                            <div className={styles.reaction}>
                              <span
                                className={`body2`}
                                style={{ color: "#aaa" }}
                              >
                                <img
                                  src={ico_like}
                                  alt="like"
                                  style={{ width: "16px" }}
                                />
                                {content.like_cnt}
                              </span>
                              <span
                                className={`body2`}
                                style={{ color: "#aaa" }}
                              >
                                <img
                                  src={ico_reply}
                                  alt="reply"
                                  style={{ width: "20px" }}
                                />
                                {content.comment_cnt}
                              </span>
                              <span
                                className={`body2`}
                                style={{ color: "#aaa" }}
                              >
                                <img
                                  src={ico_view}
                                  alt="reply"
                                  style={{ width: "20px" }}
                                />
                                {content.view}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      {content.type === "comment" && (
                        <div>
                          {content.commentAccepted ? (
                            <div
                              style={{
                                color: "#6269f5",
                              }}
                              className="body2"
                            >
                              <img
                                src={ico_reply_accepted}
                                alt="accepted"
                                style={{ width: "16px", marginRight: "2px" }}
                              />
                              답변채택
                            </div>
                          ) : (
                            ""
                          )}
                          <span className={styles.content}>
                            {stripHtml(content.content)}
                          </span>
                          <div className={styles.reaction_wrap}>
                            <div className={`body2 ${styles.date}`}>
                              {new Date(content.created_at)
                                .toISOString()
                                .slice(0, 10)
                                .replace(/-/g, ".")}
                            </div>
                            <div className={styles.reaction}>
                              <span
                                className={`body2`}
                                style={{ color: "#aaa" }}
                              >
                                <img
                                  src={ico_like}
                                  alt="like"
                                  style={{ width: "16px" }}
                                />
                                {content.like_cnt}
                              </span>
                            </div>
                          </div>
                          <div
                            className={styles.origin_post}
                            onClick={() =>
                              navigate(
                                `/community/${
                                  content.post.type === "자유게시판"
                                    ? "free"
                                    : "question"
                                }/${content.post.id}`
                              )
                            }
                          >
                            <div className={styles.title_wrap}>
                              <span className={styles.type}>
                                {content.post.type}
                              </span>
                              <h5 className={styles.title}>
                                {content.post.title}
                              </h5>
                            </div>
                            <div className={styles.content}>
                              {stripHtml(content.post.content)}
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
