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
  const { showLoading, hideLoading, isLoading } = useLoading();
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
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setPostList((prevState) => ({
        ...prevState,
        working: response.data,
      }));
    };
    const getTraining = async () => {
      const response: any = await reviewApi.getTrainingReviewsByUser();
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setPostList((prevState) => ({
        ...prevState,
        training: response.data,
      }));
    };
    const getPost = async () => {
      const response: any = await communityApi.getPostListByUser();
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        window.location.reload();
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

  return (
    <div className={styles.home_wrap}>
      <div className={styles.review_wrap}>
        <div className={styles.item_wrap}>
          <div className={styles.header}>
            <h4>전현직리뷰</h4>
            <div
              className="body2"
              style={{ color: "#aaa", cursor: "pointer" }}
              onClick={() => navigate("/mypage/working")}
            >
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.working.slice(0, 3).map((item, index) => (
              <li className={styles.item} key={index}>
                <div className="caption" style={{ color: "#aaa" }}>
                  {item.created_date.slice(0, 10).replace(/-/g, ".")}
                </div>
                <div className={styles.title}>{item.highlight}</div>
                <div className={styles.reaction}>
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
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.item_wrap}>
          <div className={styles.header}>
            <h4>실습리뷰</h4>
            <div
              className="body2"
              style={{ color: "#aaa", cursor: "pointer" }}
              onClick={() => navigate("/mypage/training")}
            >
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.training.slice(0, 3).map((item, index) => (
              <li className={styles.item} key={index}>
                <div className="caption" style={{ color: "#aaa" }}>
                  {item.created_date.slice(0, 10).replace(/-/g, ".")}
                </div>
                <div className={styles.title}>{item.highlight}</div>
                <div className={styles.reaction}>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.community_wrap}>
        <div className={styles.item_wrap}>
          <div className={styles.header}>
            <h4>자유게시판</h4>
            <div
              className="body2"
              style={{ color: "#aaa", cursor: "pointer" }}
              onClick={() => navigate("/mypage/free")}
            >
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.free.slice(0, 3).map((item, index) => (
              <li className={styles.item} key={index}>
                <div className="caption" style={{ color: "#aaa" }}>
                  {new Date(item.created_at)
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, ".")}
                </div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.reaction}>
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
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.item_wrap}>
          <div className={styles.header}>
            <h4>Q&A게시판</h4>
            <div
              className="body2"
              style={{ color: "#aaa", cursor: "pointer" }}
              onClick={() => navigate("/mypage/question")}
            >
              <img
                src={ico_arrow}
                alt="더보기"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
          <ul className={styles.item_list}>
            {postList.question.slice(0, 3).map((item, index) => (
              <li className={styles.item} key={index}>
                <div className="caption" style={{ color: "#aaa" }}>
                  {new Date(item.created_at)
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, ".")}
                </div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.reaction}>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
