import communityApi from "@/apis/community";
import ico_arrow from "@/assets/images/ico_arrow_down.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_view from "@/assets/images/ico_view.png";
import ProfileImage from "@/components/ProfileImage";
import { useLoading } from "@/contexts/LoadingContext";
import { PostListItemContent } from "@/interface/Community";
import { CommonReviewContent } from "@/interface/Review";
import agoDate from "@/utils/agoDate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

interface PostList {
  working: CommonReviewContent[];
  training: CommonReviewContent[];
  post: PostListItemContent[];
  free: PostListItemContent[];
  question: PostListItemContent[];
}

const Home = () => {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [postList, setPostList] = useState<PostList>({
    working: [],
    training: [],
    post: [],
    free: [],
    question: [],
  });
  const [currentTab, setCurrentTab] = useState({
    post: "all",
    review: "all",
  });
  const [currentData, setCurrentData] = useState<{
    post: PostListItemContent[];
    review: CommonReviewContent[];
  }>({
    post: [],
    review: [],
  });
  useEffect(() => {
    setCurrentData({
      post:
        currentTab.post === "free"
          ? postList.free
          : currentTab.post === "question"
          ? postList.question
          : [...postList.free, ...postList.question],
      review:
        currentTab.review === "working"
          ? postList.working
          : currentTab.review === "training"
          ? postList.training
          : [...postList.working, ...postList.training],
    });
  }, [currentTab, postList]);
  useEffect(() => {
    showLoading();
    const getFreeList = async () => {
      const response: any = await communityApi.getPostList("?type=1&page=1");
      if (response.status !== 200) {
        hideLoading();
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setPostList((prev) => ({
        ...prev,
        free: response.data.result,
      }));
    };
    const getQuestionList = async () => {
      const response: any = await communityApi.getPostList("?type=2&page=1");
      if (response.status !== 200) {
        hideLoading();
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setPostList((prev) => ({
        ...prev,
        question: response.data.result,
      }));
    };
    getFreeList();
    getQuestionList();
    hideLoading();
  }, []);
  console.log(currentData);

  return (
    <div className={styles.home_wrap}>
      <div>배너</div>
      <div className={styles.content_wrap}>
        <div className={styles.community_wrap}>
          <div className={styles.header}>
            <h3>커뮤니티</h3>
            <div className={styles.tab_wrap}>
              <div className={styles.tab}>
                <button
                  className={`${
                    currentTab.post === "all" && styles.current_tab
                  }`}
                  onClick={() =>
                    setCurrentTab((prev) => ({ ...prev, post: "all" }))
                  }
                >
                  <h5>최신</h5>
                </button>
                <button
                  className={`${
                    currentTab.post === "free" && styles.current_tab
                  }`}
                  onClick={() =>
                    setCurrentTab((prev) => ({ ...prev, post: "free" }))
                  }
                >
                  <h5>자유게시판</h5>
                </button>
                <button
                  className={`${
                    currentTab.post === "question" && styles.current_tab
                  }`}
                  onClick={() =>
                    setCurrentTab((prev) => ({ ...prev, post: "question" }))
                  }
                >
                  <h5>질문&답변</h5>
                </button>
              </div>
              <button
                className={styles.btn_more}
                type="button"
                onClick={() =>
                  navigate(
                    `${
                      currentTab.post === "all"
                        ? "/community"
                        : currentTab.post === "free"
                        ? "/community/free"
                        : "/community/question"
                    }`
                  )
                }
              >
                더보기
                <img
                  src={ico_arrow}
                  alt="더보기"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </button>
            </div>
          </div>
          <div className={styles.body_wrap}>
            <ul>
              {currentData.post
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .slice(0, 5)
                .map((post, index) => (
                  <li className={styles.item} key={post.id}>
                    <h5 className={styles.type}>
                      {post.postType.toString() === "1"
                        ? "자유게시판"
                        : "질문&답변"}
                    </h5>
                    <div className={styles.content}>
                      <div className={styles.title_wrap}>
                        <div
                          className={styles.title}
                          onClick={() =>
                            navigate(
                              `${
                                post.postType.toString() === "1"
                                  ? `/community/free/${post.id}`
                                  : `/community/question/${post.id}`
                              }`
                            )
                          }
                        >
                          {post.title}
                        </div>
                        <div className={styles.user_info}>
                          <span>{post.writer.nickname}</span>
                          <ProfileImage src={post.writer.profile_image} />
                          <span>{agoDate(post.created_at)}</span>
                        </div>
                      </div>
                      <div className={styles.reaction}>
                        <span className={`body2`} style={{ color: "#aaa" }}>
                          <img
                            src={ico_like}
                            alt="like"
                            style={{ width: "16px" }}
                          />
                          {post.like_cnt}
                        </span>
                        <span className={`body2`} style={{ color: "#aaa" }}>
                          <img
                            src={ico_reply}
                            alt="reply"
                            style={{ width: "20px" }}
                          />
                          {post.comment_cnt}
                        </span>
                        <span className={`body2`} style={{ color: "#aaa" }}>
                          <img
                            src={ico_view}
                            alt="reply"
                            style={{ width: "20px" }}
                          />
                          {post.view}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className={styles.review_wrap}>
          <div className={styles.header}>
            <h3>리뷰</h3>
            <div className={styles.tab_wrap}>
              <div className={styles.tab}>
                <button
                  className={`${
                    currentTab.review === "all" && styles.current_tab
                  }`}
                  onClick={() =>
                    setCurrentTab((prev) => ({ ...prev, review: "all" }))
                  }
                >
                  <h5>최신</h5>
                </button>
                <button
                  className={`${
                    currentTab.review === "working" && styles.current_tab
                  }`}
                  onClick={() =>
                    setCurrentTab((prev) => ({ ...prev, review: "working" }))
                  }
                >
                  <h5>전현직</h5>
                </button>
                <button
                  className={`${
                    currentTab.review === "training" && styles.current_tab
                  }`}
                  onClick={() =>
                    setCurrentTab((prev) => ({ ...prev, review: "training" }))
                  }
                >
                  <h5>실습</h5>
                </button>
              </div>
              <button className={styles.btn_more} type="button">
                더보기
                <img
                  src={ico_arrow}
                  alt="더보기"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>하단배너</div>
    </div>
  );
};

export default Home;
