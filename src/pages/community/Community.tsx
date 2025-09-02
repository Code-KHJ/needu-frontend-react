import communityApi from "@/apis/community";
import ico_arrow from "@/assets/images/ico_arrow_down.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_view from "@/assets/images/ico_view.png";
import ProfileImage from "@/components/ProfileImage";
import {
  PostListItemContent,
  WeeklyListItemContent,
} from "@/interface/Community";
import agoDate from "@/utils/agoDate";
import userLevel from "@/utils/calculateUserLevel";
import stripHtml from "@/utils/stripHtml";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Helmets from "../helmets";
import styles from "./Community.module.scss";

const Community = () => {
  const navigate = useNavigate();
  const winInnerWidth = window.innerWidth;

  const [freeList, setFreeList] = useState<{
    result: PostListItemContent[];
    totalPages: number;
  }>({
    result: [],
    totalPages: 1,
  });
  const [questionList, setQuestionList] = useState<{
    result: PostListItemContent[];
    totalPages: number;
  }>({
    result: [],
    totalPages: 1,
  });
  const [weeklyList, setWeeklyList] = useState<WeeklyListItemContent[]>([]);
  useEffect(() => {
    const getFreeList = async () => {
      const response: any = await communityApi.getPostList("?type=1&page=1");
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setFreeList(response.data);
    };
    const getQuestionList = async () => {
      const response: any = await communityApi.getPostList("?type=2&page=1");
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setQuestionList(response.data);
    };
    const getWeeklyList = async () => {
      const response: any = await communityApi.getWeeklyBest();
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      console.log(response);
      setWeeklyList(response.data);
    };
    getFreeList();
    getQuestionList();
    getWeeklyList();
  }, []);

  return (
    <>
      <Helmets
        title={"사회복지 커뮤니티, NEEDU"}
        description="전혁직 기관 리뷰, 실습니뷰,  니쥬챗, 커뮤니티까지 사회복지에 대한 모든 이야기를 나누며 더 발전해보세요"
      ></Helmets>
      <div className={styles.wrap}>
        <div className={`${styles.banner} ${styles.banner_community}`}>
          <div
            className={styles.opacity}
            onClick={
              winInnerWidth < 768 ? () => navigate("/notice/13") : () => {}
            }
          ></div>
          <div className={styles.content}>
            <button
              className="tab_show"
              type="button"
              onClick={() => navigate("/notice/13")}
            >
              이벤트 참여하기
            </button>
            <h4>9월 이벤트</h4>
            <span>
              요즘 나를 지치게 하는 일, 그런데 아무 데도 말 못 했던 것
            </span>
          </div>
        </div>
        <div className={styles.weekly_wrap}>
          <div className={styles.weekly_content}>
            <h2>Weekly Best</h2>
            <ul className={styles.content_list}>
              {weeklyList
                .slice(-3)
                .reverse()
                .map((post, index) => (
                  <li className={styles.content_item} key={index}>
                    <div className={styles.info}>
                      <ProfileImage src={post.writer.profile_image} />
                      <span
                        className={`body2  ${styles.nickname}`}
                        onClick={() =>
                          navigate(`/users/${post.writer.nickname}`)
                        }
                      >
                        <span>{post.writer.nickname}</span>
                        <img
                          src={userLevel(post.writer.activity_points)?.icon}
                          alt="레벨"
                          style={{ width: "18px", marginLeft: "4px" }}
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
                            marginRight: "4px",
                          }}
                        />
                        {post.view}
                      </span>
                    </div>
                    <h5
                      className={styles.title}
                      onClick={() =>
                        navigate(
                          `${
                            post.postType === "자유게시판"
                              ? `/community/free/${post.id}`
                              : `/community/question/${post.id}`
                          }`
                        )
                      }
                    >
                      {post.title}
                    </h5>
                    <div
                      className={styles.content}
                      onClick={() =>
                        navigate(
                          `${
                            post.postType === "자유게시판"
                              ? `/community/free/${post.id}`
                              : `/community/question/${post.id}`
                          }`
                        )
                      }
                    >
                      {stripHtml(post.content)}
                    </div>
                    <div className={styles.reaction}>
                      <span className={`body2`} style={{ color: "#aaa" }}>
                        <img
                          src={ico_like}
                          alt="like"
                          style={{ width: "16px", marginRight: "4px" }}
                        />
                        {post.like_cnt}
                      </span>
                      <span className={`body2`} style={{ color: "#aaa" }}>
                        <img
                          src={ico_reply}
                          alt="reply"
                          style={{ width: "20px", marginRight: "4px" }}
                        />
                        {post.comment_cnt}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.sub_banner}></div>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.free_wrap}>
            <div className={styles.header}>
              <h4>자유게시판</h4>
              <div
                className="body2"
                style={{ color: "#aaa", cursor: "pointer" }}
                onClick={() => navigate("/community/free")}
              >
                <img
                  src={ico_arrow}
                  alt="더보기"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
            </div>
            <ul className={styles.content_list}>
              {freeList.result.slice(0, 5).map((post, index) => (
                <li className={styles.content_item} key={index}>
                  <div className={styles.info}>
                    <ProfileImage src={post.writer.profile_image} />
                    <span
                      className={`body2  ${styles.nickname}`}
                      onClick={() => navigate(`/users/${post.writer.nickname}`)}
                    >
                      <span>{post.writer.nickname}</span>
                      <img
                        src={userLevel(post.writer.activity_points)?.icon}
                        alt="레벨"
                        style={{ width: "18px", marginLeft: "4px" }}
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
                          marginRight: "4px",
                        }}
                      />
                      {post.view}
                    </span>
                  </div>
                  <h5
                    className={styles.title}
                    onClick={() => navigate(`/community/free/${post.id}`)}
                  >
                    {post.title}
                  </h5>
                  <div className={styles.reaction}>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {post.like_cnt}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_reply}
                        alt="reply"
                        style={{ width: "20px", marginRight: "4px" }}
                      />
                      {post.comment_cnt}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.question_wrap}>
            <div className={styles.header}>
              <h4>질문&답변</h4>
              <div
                className="body2"
                style={{ color: "#aaa", cursor: "pointer" }}
                onClick={() => navigate("/community/question")}
              >
                <img
                  src={ico_arrow}
                  alt="더보기"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
            </div>
            <ul className={styles.content_list}>
              {questionList.result.slice(0, 5).map((post, index) => (
                <li className={styles.content_item} key={index}>
                  <div className={styles.info}>
                    <ProfileImage src={post.writer.profile_image} />{" "}
                    <span
                      className={`body2 ${styles.nickname}`}
                      onClick={() => navigate(`/users/${post.writer.nickname}`)}
                    >
                      <span>{post.writer.nickname}</span>
                      <img
                        src={userLevel(post.writer.activity_points)?.icon}
                        alt="레벨"
                        style={{ width: "18px", marginLeft: "4px" }}
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
                          marginRight: "4px",
                        }}
                      />
                      {post.view}
                    </span>
                  </div>
                  <h5
                    className={styles.title}
                    onClick={() => navigate(`/community/question/${post.id}`)}
                  >
                    {post.title}
                  </h5>
                  <div className={styles.reaction}>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {post.like_cnt}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_reply}
                        alt="reply"
                        style={{ width: "20px", marginRight: "4px" }}
                      />
                      {post.comment_cnt}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
