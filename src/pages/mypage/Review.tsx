import reviewApi from "@/apis/review";
import styles from "./Mypage.module.scss";
import { useLoading } from "@/contexts/LoadingContext";
import { ReviewContent, ReviewTrainingDto } from "@/interface/Review";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ico_like from "@/assets/images/ico_like.png";
import ico_score from "@/assets/images/Star_1.png";
import ico_arrow_down from "@/assets/images/ico_arrow_down.png";

const Review = () => {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const reviewType = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState<
    | (ReviewContent & { expand: boolean })[]
    | (ReviewTrainingDto & { expand: boolean })[]
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
        expand: false,
      }));
      setReviewList(setData);
    };
    getReview();
    hideLoading();
  }, [reviewType]);
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
                    33333
                  </span>
                </div>
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
