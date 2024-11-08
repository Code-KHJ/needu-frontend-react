import reviewApi from "@/apis/review";
import btn_kebab from "@/assets/images/btn_kebab.png";
import ico_arrow_down from "@/assets/images/ico_arrow_down.png";
import ico_career_c from "@/assets/images/ico_career_c.png";
import ico_career_f from "@/assets/images/ico_career_f.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_like_black from "@/assets/images/ico_like_black.png";
import ico_score from "@/assets/images/Star_1.png";
import { StarList } from "@/common/StarList";
import Hashtag from "@/components/Hashtag";
import ScoreBar from "@/components/ScoreBar";
import { useConfirm } from "@/contexts/ConfirmContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import {
  DeleteReviewDto,
  ReviewContent,
  ReviewTrainingContent,
} from "@/interface/Review";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Mypage.module.scss";

const Review = () => {
  const { customConfirm } = useConfirm();
  const { showLoading, hideLoading, isLoading } = useLoading();
  // @ts-ignore
  const { user } = useUser();
  const location = useLocation();
  const reviewType = location.pathname.split("/")[2];
  const starList = StarList;
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState<
    (ReviewContent &
      ReviewTrainingContent & { expand: boolean; kebab: boolean } & {
        user: { id: number; user_id: string };
      })[]
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
        hideLoading();
        navigate("/error", {
          state: { previous: "/mypage" },
        });
        return;
      }
      const setData = response.data.map((item: any) => ({
        ...item,
        expand: false,
        kebab: false,
        user: item.user,
      }));
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

  const showExpand = (id: number) => {
    setReviewList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, expand: !item.expand } : item
      )
    );
  };
  const showKebab = (id: number) => {
    setReviewList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, kebab: !item.kebab } : item
      )
    );
  };
  const editReview = (review_no: number) => {
    navigate(`/review/${reviewType}/edit?no=${review_no}`);
  };
  const deleteReview = async (review_no: number) => {
    const review = reviewList.filter((item) => item.id === review_no);
    if (user.id != review[0].user.id) {
      alert("본인이 작성한 리뷰만 삭제가 가능합니다.");
      return;
    }
    const deleteReviewDto: DeleteReviewDto = {
      user_id: user.user_id,
      review_no: review_no,
    };
    const confirmed = await customConfirm(
      "삭제한 리뷰는 복구할 수 없습니다. 정말로 리뷰를 삭제하시겠습니까?"
    );
    if (confirmed) {
      showLoading();
      let response: any;
      if (reviewType === "working") {
        response = await reviewApi.deleteWorkingReview(deleteReviewDto);
      } else if (reviewType === "training") {
        response = await reviewApi.deleteTrainingReview(deleteReviewDto);
      }
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        hideLoading();
        return;
      }
      alert("리뷰가 삭제되었습니다.");
      hideLoading();
      window.location.reload();
    }
  };
  const moveDetail = (corpName: string) => {
    const encodedCorpName = encodeURIComponent(corpName).replace(/%2B/g, "%2B");
    navigate(`/review/detail/${reviewType}?name=${encodedCorpName}`);
  };
  return (
    <div className={styles.review_wrap}>
      <ul className={styles.review_list}>
        {reviewList.map((review) => (
          <li className={styles.review_item} key={review.id}>
            <div className={styles.item_header}>
              <h5
                className={styles.corp_name}
                onClick={() => moveDetail(review.corpname)}
              >
                {review.corpname}
              </h5>
              <div className={styles.kebab}>
                <img
                  src={btn_kebab}
                  style={{ cursor: "pointer" }}
                  alt="kebab"
                  onClick={() => showKebab(review.id)}
                />
                {review.kebab && (
                  <div className={styles.kebab_list}>
                    <div
                      className={styles.kebab_item}
                      onClick={() => editReview(review.id)}
                    >
                      수정
                    </div>
                    <div
                      className={styles.kebab_item}
                      onClick={() => deleteReview(review.id)}
                    >
                      삭제
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.highlight}>{review.highlight}</div>
            {/* 펼쳤을 떄 */}
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
                      <h5>{review.total_score}</h5>
                    </div>
                    <ul className={styles.score_detail}>
                      {reviewType === "working" &&
                        starList.working.map((item) => (
                          <li key={item.en}>
                            <div className="body2">{item.ko}</div>
                            <div className={styles.score_bar}>
                              <ScoreBar width="80px" value={review[item.en]} />
                              <span className="body2">{review[item.en]}</span>
                            </div>
                          </li>
                        ))}
                      {reviewType === "training" &&
                        starList.training.map((item) => (
                          <li key={item.en}>
                            <div className="body2">
                              {item.ko === "수퍼바이징 만족도"
                                ? "수퍼바이징"
                                : item.ko}
                            </div>
                            <div className={styles.score_bar}>
                              <ScoreBar width="80px" value={review[item.en]} />
                              <span className="body2">{review[item.en]}</span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className={styles.review_detail_wrap}>
                    {reviewType === "working" ? (
                      <div className={styles.info}>
                        <img
                          src={
                            careerStatus(review.userCareer?.last_date) ===
                            "전직자"
                              ? ico_career_f
                              : ico_career_c
                          }
                        />
                        <span>
                          {careerStatus(review.userCareer?.last_date)}
                        </span>
                        <span>{review.user.user_id}</span>
                        <span>{review.userCareer?.type}</span>
                        <span>
                          {review.created_date.slice(0, 10).replace(/-/g, ".")}
                        </span>
                      </div>
                    ) : (
                      <div className={styles.info}>
                        <span>{review.user.user_id}</span>
                        <span>
                          {review.year} {review.season}
                        </span>
                        <span>{review.number_of_participants}명</span>
                        <span>{review.cost?.toLocaleString()}원</span>
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
                    {reviewType === "working" && review.hashtag ? (
                      <div className={styles.hashtag}>
                        {Hashtag(review.hashtag).map((item) => (
                          <span
                            style={{
                              marginRight: "12px",
                              marginBottom: "4px",
                              display: "inline-block",
                              color: "#888",
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
                <div className={styles.like}>
                  <img
                    src={ico_like_black}
                    alt="like"
                    style={{ width: "20px", height: "20px" }}
                  />
                  도움이 돼요 <h5>{review.likes}</h5>
                </div>
              </div>
            ) : (
              <div className={styles.reaction_wrap}>
                <div className={`body2 ${styles.date}`}>
                  {review.created_date.slice(0, 10).replace(/-/g, ".")}
                </div>
                <div className={styles.reaction}>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_like}
                      alt="like"
                      style={{ width: "16px", height: "16px" }}
                    />
                    {review.likes}
                  </span>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_score}
                      alt="score"
                      style={{ width: "16px", height: "16px" }}
                    />
                    {review.total_score}
                  </span>
                </div>
              </div>
            )}
            <button onClick={() => showExpand(review.id)}>
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
        {!isLoading && reviewList.length === 0 && (
          <li className={styles.review_item} style={{ height: "200px" }}>
            <div className={styles.review_none}>
              <p>작성한 리뷰가 없습니다. 첫 리뷰를 남겨보세요!</p>
              <button
                type="button"
                onClick={() => navigate(`/review/search/${reviewType}`)}
              >
                리뷰 남기러 가기
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Review;
