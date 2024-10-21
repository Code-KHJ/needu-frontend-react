import reviewApi from "@/apis/review";
import ico_arrow_down from "@/assets/images/ico_arrow_down.png";
import ico_career_c from "@/assets/images/ico_career_c.png";
import ico_career_f from "@/assets/images/ico_career_f.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_score from "@/assets/images/Star_1.png";
import Hashtag from "@/components/Hashtag";
import ScoreBar from "@/components/ScoreBar";
import { useLoading } from "@/contexts/LoadingContext";
import { ReviewContent, ReviewTrainingContent } from "@/interface/Review";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Mypage.module.scss";

const Review = () => {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const reviewType = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState<
    | (ReviewContent & { expand: boolean })[]
    | (ReviewTrainingContent & { expand: boolean })[]
  >([]);

  useEffect(() => {
    showLoading();
    const getReview = async () => {
      let response: any;
      if (reviewType === "working") {
        response = await reviewApi.getWorkingReviewsByUser();
      } else if (reviewType === "training") {
        response = await reviewApi.getTrainingReviewsByUser();
      }
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      const setData = response.data.map((item: any) => ({
        ...item,
        expand: true,
        user: item.user,
      }));
      console.log(setData);
      setReviewList(setData);
    };
    getReview();
    hideLoading();
  }, [reviewType]);

  const careerStatus = (lastdate: Date | string) => {
    if (typeof lastdate === "string") {
      lastdate = new Date(lastdate);
    }
    const today = new Date();
    const lastDate = new Date(lastdate);
    const status = lastDate < today ? "전직자" : "현직자";
    return status;
  };
  console.log(reviewList);

  return (
    <div className={styles.review_wrap}>
      <ul className={styles.review_list}>
        {/* 접혔을떄 */}
        {reviewList.map((review) => (
          <li className={styles.review_item} key={review.id}>
            <div className={styles.item_header}>
              <h5 className={styles.corp_name}>
                기관명입니다123123123기관명입니다123123123 기관명입니다123123123
              </h5>
              <div>점</div>
            </div>
            <div className={styles.highlight}>
              한줄평입니다.123123123한줄평입니다.123123123
              한줄평입니다.123123123 한줄평입니다.123123123
            </div>
            {review.expand ? (
              <div className={styles.review_body}>
                <div className={styles.review_content}>
                  <div className={styles.score_wrap}>
                    <div className={styles.total_score}>
                      <img
                        src={ico_score}
                        alt="score"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <span>총점</span>
                      <h5>2.5</h5>
                    </div>
                    <ul className={styles.score_detail}>
                      <li>
                        <div className="body2">성장가능성</div>
                        <div className={styles.score_bar}>
                          <ScoreBar width="80px" value={3.5} />
                          <span className="body2">2.5</span>
                        </div>
                      </li>
                      <li>
                        <div className="body2">성장가능성</div>
                        <div className={styles.score_bar}>
                          <ScoreBar width="80px" value={3.5} />
                          <span className="body2">2.5</span>
                        </div>
                      </li>
                      <li>
                        <div className="body2">성장가능성</div>
                        <div className={styles.score_bar}>
                          <ScoreBar width="80px" value={3.5} />
                          <span className="body2">2.5</span>
                        </div>
                      </li>
                      <li>
                        <div className="body2">성장가능성</div>
                        <div className={styles.score_bar}>
                          <ScoreBar width="80px" value={3.5} />
                          <span className="body2">2.5</span>
                        </div>
                      </li>
                      <li>
                        <div className="body2">성장가능성</div>
                        <div className={styles.score_bar}>
                          <ScoreBar width="80px" value={3.5} />
                          <span className="body2">2.5</span>
                        </div>
                      </li>
                      <li>
                        <div className="body2">성장가능성</div>
                        <div className={styles.score_bar}>
                          <ScoreBar width="80px" value={3.5} />
                          <span className="body2">2.5</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.review_detail_wrap}>
                    {reviewType === "working" ? (
                      <div className={styles.info}>
                        <img
                          src={
                            careerStatus(review.userCareer.last_date) ===
                            "전직자"
                              ? ico_career_f
                              : ico_career_c
                          }
                        />
                        <span>{careerStatus(review.userCareer.last_date)}</span>
                        {/* @ts-ignore */}
                        <span>{review.user.user_id}</span>
                        <span>{review.userCareer.type}</span>
                        <span>
                          {review.created_date.slice(0, 10).replace(/-/g, ".")}
                        </span>
                      </div>
                    ) : (
                      <div className={styles.info}>
                        {/* @ts-ignore */}
                        <span>{review.user.user_id}</span>
                        <span>
                          {review.year} {review.season}
                        </span>
                        <span>{review.number_of_participants}명</span>
                        <span>{review.cost.toLocaleString()}원</span>
                        <span>
                          {review.created_date.slice(0, 10).replace(/-/g, ".")}
                        </span>
                      </div>
                    )}
                    <div className={styles.pros}>
                      <h5>장점</h5>
                      <p>{review.pros}</p>
                    </div>
                    <div className={styles.cons}>
                      <h5>단점</h5>
                      <p>{review.cons}</p>
                    </div>
                    {reviewType === "working" ? (
                      <div className={styles.hashtag}>
                        {Hashtag(review.hashtag).map((item) => (
                          <span
                            style={{
                              marginRight: "12px",
                              marginBottom: "8px",
                              display: "inline-block",
                            }}
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div>좋아요</div>
              </div>
            ) : (
              <div className={styles.reaction_wrap}>
                <div className={`body2 ${styles.date}`}>2024.10.10</div>
                <div className={styles.reaction}>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_like}
                      alt="like"
                      style={{ width: "16px", height: "16px" }}
                    />
                    10
                  </span>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_score}
                      alt="score"
                      style={{ width: "16px", height: "16px" }}
                    />
                    3
                  </span>
                </div>
              </div>
            )}

            <button onClick={() => {}}>
              <img
                src={ico_arrow_down}
                alt="더보기"
                style={{
                  width: "16px",
                  transform: review.expand ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
