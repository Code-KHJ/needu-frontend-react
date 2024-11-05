import communityApi from "@/apis/community";
import reviewApi from "@/apis/review";
import ico_arrow from "@/assets/images/ico_arrow_down.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_score from "@/assets/images/Star_1.png";
import { useLoading } from "@/contexts/LoadingContext";
import { PostContent } from "@/interface/Community";
import { ReviewContent, ReviewTrainingContent } from "@/interface/Review";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Mypage.module.scss";

interface PostList {
  working: ReviewContent[];
  training: ReviewTrainingContent[];
  free: PostContent[];
  question: PostContent[];
}
const Home = () => {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const [postList, setPostList] = useState<PostList>({
    working: [],
    training: [],
    free: [],
    question: [],
  });
  useEffect(() => {
    showLoading();
    const getWorking = async () => {
      const response: any = await reviewApi.getWorkingReviewsByUser();
      if (response.status !== 200) {
        hideLoading();
        navigate("/error", {
          state: { previous: "/mypage" },
        });
      }
      setPostList((prevState) => ({
        ...prevState,
        working: response.data,
      }));
    };
    const getTraining = async () => {
      const response: any = await reviewApi.getTrainingReviewsByUser();
      if (response.status !== 200) {
        hideLoading();
        navigate("/error", {
          state: { previous: "/mypage" },
        });
      }
      setPostList((prevState) => ({
        ...prevState,
        training: response.data,
      }));
    };
    const getPost = async () => {
      const response: any = await communityApi.getPostListByUser();
      if (response.status !== 200) {
        hideLoading();
        navigate("/error", {
          state: { previous: "/mypage" },
        });
      }
      setPostList((prevState) => ({
        ...prevState,
        //@ts-ignore
        free: response.data.filter((item) => item.postType === "자유게시판"),
        //@ts-ignore
        question: response.data.filter((item) => item.postType === "질문&답변"),
      }));
    };
    getWorking();
    getTraining();
    getPost();
    hideLoading();
  }, []);

  const moveReviewDetail = (corpName: string, type: string) => {
    const encodedCorpName = encodeURIComponent(corpName).replace(/%2B/g, "%2B");
    navigate(`/review/detail/${type}?name=${encodedCorpName}`);
  };
  return (
    <div className={styles.home_wrap}>
      <div className={styles.review_wrap}>
        <div className={styles.item_wrap}>
          <div
            className={styles.header}
            onClick={() => navigate("/mypage/working")}
          >
            <h4>전현직리뷰</h4>
            <div className="body2" style={{ color: "#aaa" }}>
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.working.slice(0, 3).map((item, index) => (
              <li
                className={styles.item}
                key={index}
                onClick={() => moveReviewDetail(item.corpname, "working")}
              >
                <div className={styles.title}>{item.highlight}</div>
                <div className={styles.reaction}>
                  <div className="body2" style={{ color: "#aaa" }}>
                    {item.created_date.slice(0, 10).replace(/-/g, ".")}
                  </div>
                  <div>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {item.likes}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_score}
                        alt="score"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {item.total_score}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {postList.working.length === 0 && (
              <div className={styles.not_yet}>
                <span>작성한 리뷰가 없습니다.</span>
                <span>첫 리뷰를 남겨보세요!</span>
              </div>
            )}
          </ul>
        </div>
        <div className={styles.item_wrap}>
          <div
            className={styles.header}
            onClick={() => navigate("/mypage/training")}
          >
            <h4>실습리뷰</h4>
            <div className="body2" style={{ color: "#aaa" }}>
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.training.slice(0, 3).map((item, index) => (
              <li
                className={styles.item}
                key={index}
                onClick={() => moveReviewDetail(item.corpname, "training")}
              >
                <div className={styles.title}>{item.highlight}</div>
                <div className={styles.reaction}>
                  <div className="body2" style={{ color: "#aaa" }}>
                    {item.created_date.slice(0, 10).replace(/-/g, ".")}
                  </div>
                  <div>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {item.likes}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_score}
                        alt="score"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {item.total_score}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {postList.training.length === 0 && (
              <div className={styles.not_yet}>
                <span>작성한 리뷰가 없습니다.</span>
                <span>첫 리뷰를 남겨보세요!</span>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.community_wrap}>
        <div className={styles.item_wrap}>
          <div
            className={styles.header}
            onClick={() => navigate("/mypage/free")}
          >
            <h4>자유게시판</h4>
            <div className="body2" style={{ color: "#aaa" }}>
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.free.slice(0, 3).map((item, index) => (
              <li
                className={styles.item}
                key={index}
                onClick={() =>
                  navigate(`/community/free/${item.id}`, {
                    state: { previous: location.pathname },
                  })
                }
              >
                <div className={styles.title}>{item.title}</div>
                <div className={styles.reaction}>
                  <div className="body2" style={{ color: "#aaa" }}>
                    {new Date(item.created_at)
                      .toISOString()
                      .slice(0, 10)
                      .replace(/-/g, ".")}
                  </div>
                  <div>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {item.postLikes.length}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_reply}
                        alt="reply"
                        style={{ width: "20px", marginRight: "4px" }}
                      />
                      {item.comment_cnt}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_view}
                        alt="view"
                        style={{ width: "20px", marginRight: "4px" }}
                      />
                      {item.view}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {postList.free.length === 0 && (
              <div className={styles.not_yet}>
                <span>작성한 글이 없습니다.</span>
                <span>첫 글을 남겨보세요!</span>
              </div>
            )}
          </ul>
        </div>
        <div className={styles.item_wrap}>
          <div
            className={styles.header}
            onClick={() => navigate("/mypage/question")}
          >
            <h4>Q&A게시판</h4>
            <div className="body2" style={{ color: "#aaa" }}>
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.question.slice(0, 3).map((item, index) => (
              <li
                className={styles.item}
                key={index}
                onClick={() =>
                  navigate(`/community/question/${item.id}`, {
                    state: { previous: location.pathname },
                  })
                }
              >
                <div className={styles.title}>{item.title}</div>
                <div className={styles.reaction}>
                  <div className="body2" style={{ color: "#aaa" }}>
                    {new Date(item.created_at)
                      .toISOString()
                      .slice(0, 10)
                      .replace(/-/g, ".")}
                  </div>
                  <div>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px", marginRight: "4px" }}
                      />
                      {item.postLikes.length}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_reply}
                        alt="reply"
                        style={{ width: "20px", marginRight: "4px" }}
                      />
                      {item.comment_cnt}
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_view}
                        alt="view"
                        style={{ width: "20px", marginRight: "4px" }}
                      />
                      {item.view}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {postList.free.length === 0 && (
              <div className={styles.not_yet}>
                <span>작성한 글이 없습니다.</span>
                <span>첫 글을 남겨보세요!</span>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
