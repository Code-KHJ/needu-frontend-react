import React, { useEffect, useState } from 'react';
import styles from './Detail.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ScoreStar from '@/components/ScoreStar';
import { StarList } from '@/common/StarList';
import ScoreBar from '@/components/ScoreBar';
import corpApi from '@/apis/corp';
import reviewApi from '@/apis/review';
import { DeleteReviewDto, LikeDto, ReviewContent } from '@/interface/Review';
import Hashtag from '@/components/Hashtag';
import { useUser } from '@/contexts/UserContext';
import BlindComment from '@/components/BlindComment';
import ReportModal from '@/components/modal/ReportModal';

const DetailWorking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const corpName = queryParams.get('name');
  const navigate = useNavigate();
  const user = useUser();
  const starList = StarList.working;
  const clickTab = (type: string) => {
    navigate(`/review/detail/${type}?name=${corpName}`);
  };

  const [corp, setCorp] = useState({
    no: null,
    corp_name: null,
    city: null,
    gugun: null,
    hashtag: [],
    cnt: null,
    avg: null,
  });

  const [corpScore, setCorpScore] = useState({
    total_score: 0,
    growth_score: 0,
    leadership_score: 0,
    reward_score: 0,
    worth_score: 0,
    culture_score: 0,
    worklife_score: 0,
  });

  const [reviews, setReviews] = useState<ReviewContent[]>([]);

  useEffect(() => {
    if (user.loading) {
      return;
    }

    if (!corpName) {
      navigate('/');
      return;
    }
    const getCorp = async () => {
      const response: any = await corpApi.getWithWorking(corpName);
      if (response.status !== 200) {
        navigate('/');
      }
      if (!response.data.corp_name) {
        navigate('/');
      }
      setCorp(response.data);
    };

    const getCorpScore = async () => {
      const response: any = await reviewApi.getWorkingScore(corpName);
      if (response.status !== 200) {
        navigate('/');
      }
      setCorpScore(response.data);
    };

    const getReviews = async () => {
      const response = await reviewApi.getWorkingReviews(corpName);
      if (response.status !== 200) {
        navigate('/');
      }
      setReviews(response.data);
      response.data.forEach((review) => {
        const isLiked =
          Array.isArray(review.reviewTrianingLikes) &&
          review.reviewLikes.some((like) => {
            return like.user_id === user.user.id;
          });

        setIsLike((prevState) => ({
          ...prevState,
          [review.id]: isLiked,
        }));
      });
    };
    getCorp();
    getCorpScore();
    getReviews();
  }, [corpName, user]);

  const careerStatus = (lastdate) => {
    const today = new Date();
    const lastDate = new Date(lastdate);
    const status = lastDate < today ? '전직자' : '현직자';
    return status;
  };

  const [showToggle, setShowToggle] = useState<{ [key: number]: boolean }>({});
  const handleToggle = (index: number) => {
    setShowToggle((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [showKebab, setShowKebab] = useState<{ [key: number]: boolean }>({});
  const handleKebab = (index: number) => {
    setShowKebab((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [showAll, setShowAll] = useState<boolean>(false);
  const handleShowAll = () => {
    if (user.user.authority > 0) {
      setShowAll(true);
      return;
    }
    alert('더 많은 리뷰를 보려면 리뷰를 작성해주세요.');
  };

  const [isLike, setIsLike] = useState<{ [key: number]: boolean }>({});

  const like = async (review_no: number) => {
    if (!user || user.user.id === null) {
      alert('로그인 후 이용이 가능합니다.');
      return;
    }
    const likeDto: LikeDto = {
      review_no: review_no,
      type: 'working',
      action: !isLike[review_no] ? 'plus' : 'minus',
    };
    const response = await reviewApi.likeReview(likeDto);
    if (response.status !== 200) {
      alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else {
      setIsLike((prevState) => ({
        ...prevState,
        [review_no]: !prevState[review_no],
      }));
      setReviews((prevReviews) =>
        incrementLikeById(prevReviews, review_no, likeDto.action)
      );
    }
  };

  const incrementLikeById = (reviews, id, action) => {
    return reviews.map((review) => {
      if (review.id === id) {
        if (action === 'plus') {
          return {
            ...review,
            likes: review.likes + 1,
          };
        }
        if (action === 'minus') {
          return {
            ...review,
            likes: review.likes - 1,
          };
        }
      }
      return review;
    });
  };

  const editReview = (review_no: number) => {
    navigate(`/review/working/edit?no=${review_no}`);
  };

  const deleteReview = async (index: number, review_no: number) => {
    if (user.user.id != reviews[index].user.id) {
      alert('본인이 작성한 리뷰만 삭제가 가능합니다.');
      return;
    }
    const deleteReviewDto: DeleteReviewDto = {
      user_id: user.user.user_id,
      review_no: review_no,
    };
    const confirmed = confirm(
      '삭제한 리뷰는 복구할 수 없습니다. 정말로 리뷰를 삭제하시겠습니까?'
    );
    if (confirmed) {
      const response = await reviewApi.deleteWorkingReview(deleteReviewDto);
      if (response.status !== 200) {
        alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      alert('리뷰가 삭제되었습니다.');
      window.location.reload();
    }
  };

  //report
  const [modal, setModal] = useState({
    isOpen: false,
    target: '전현직리뷰',
    target_id: 0,
  });
  const handleModalTarget = (target_id: number) => {
    setModal({
      ...modal,
      isOpen: true,
      target_id: target_id,
    });
  };
  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  return (
    <div className={styles.detail_working_wrap}>
      <div className={styles.corp_info}>
        <h1 className={styles.corp_name}>{corp.corp_name}</h1>
        <p className={`.body1 ${styles.corp_location}`}>
          {corp.city} {corp.gugun}
        </p>
        <p className={styles.hashtag}>
          {corp.hashtag &&
            Hashtag(corp.hashtag).length > 0 &&
            Hashtag(corp.hashtag).map((item) => (
              <span
                style={{
                  marginRight: '8px',
                  marginBottom: '8px',
                  display: 'inline-block',
                }}
                key={item}
              >
                {item}
              </span>
            ))}
        </p>
      </div>
      <section>
        <div className={styles.tab}>
          <div
            className={`${
              location.pathname == '/review/detail/working'
                ? styles.current
                : ''
            }`}
            onClick={() => clickTab('working')}
          >
            <h4>전현직리뷰</h4>
          </div>
          <div
            className={`${
              location.pathname == '/review/detail/training'
                ? styles.current
                : ''
            }`}
            onClick={() => clickTab('training')}
          >
            <h4>실습리뷰</h4>
          </div>
        </div>
        <div className={styles.summary_wrap}>
          <div className={styles.star_wrap}>
            <div className={styles.total}>
              <ScoreStar
                name="total_score"
                mosize="40px"
                tabsize="40px"
                readonly={true}
                value={corp.avg}
                onChange={() => {}}
              />
              <h1>{corp.avg}</h1>
              <span className={`body1 ${styles.cnt}`}>{corp.cnt}개 리뷰</span>
            </div>
            <div className={styles.score_list}>
              {starList.map((item) => (
                <div className={styles.score_item} key={item.en}>
                  <h5>{item.ko}</h5>
                  <div className={styles.score_score}>
                    <p>
                      {isNaN(parseFloat(corpScore[item.en]))
                        ? '0.0'
                        : parseFloat(corpScore[item.en]).toFixed(1)}
                    </p>
                    <ScoreBar
                      width="160px"
                      value={
                        isNaN(parseFloat(corpScore[item.en]))
                          ? '0.0'
                          : parseFloat(corpScore[item.en]).toFixed(1)
                      }
                    ></ScoreBar>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.write_review}>
            <p>이 기관에 대해 나눠주실 경험이 있으신가요?</p>
            <button type="button">
              <Link to={`/review/working/write?name=${corp.corp_name}`}>
                리뷰하러 가기
              </Link>
            </button>
          </div>
        </div>
        {reviews.length != 0 ? (
          <>
            <div className={styles.review_wrap}>
              {reviews.map((review, index) =>
                index === 0 || showAll ? (
                  <div
                    className={styles.review_item}
                    key={index}
                    style={showAll ? { borderBottom: '1px solid #d9d9d9' } : {}}
                  >
                    <div
                      className={`${styles.score_wrap} ${
                        review.blind != 1 ? 'blur' : ''
                      }`}
                    >
                      <div className={styles.score_summary}>
                        <h4>{review.total_score}</h4>
                        <div>
                          <ScoreStar
                            name="total_score"
                            mosize="26px"
                            tabsize="26px"
                            readonly={true}
                            value={review.total_score}
                            onChange={() => {}}
                          ></ScoreStar>
                          <img
                            src="/src/assets/images/ico_arrow_down.png"
                            style={{ cursor: 'pointer' }}
                            alt="arrow"
                            onClick={() => handleToggle(index)}
                          />
                        </div>
                      </div>
                      {showToggle[index] && (
                        <div className={styles.score_detail}>
                          {starList.map((item) => (
                            <div className={styles.item} key={item.en}>
                              <ScoreStar
                                name="total_score"
                                mosize="16px"
                                tabsize="16px"
                                readonly={true}
                                value={review[item.en]}
                                onChange={() => {}}
                              ></ScoreStar>
                              <span className="body2" style={{ color: '#aaa' }}>
                                {item.ko}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={styles.content_wrap}>
                      <div className={styles.title}>
                        <h3 className={review.blind != 1 ? 'blur' : ''}>
                          {review.highlight}
                        </h3>
                        <div className={styles.kebab}>
                          <img
                            src="/src/assets/images/btn_kebab.png"
                            style={{ cursor: 'pointer' }}
                            alt="kebab"
                            onClick={() => handleKebab(index)}
                          />
                          {user.user.id === review.user.id
                            ? showKebab[index] && (
                                <div className={styles.kebab_list}>
                                  <div
                                    className={styles.kebab_item}
                                    onClick={() => editReview(review.id)}
                                  >
                                    수정
                                  </div>
                                  <div
                                    className={styles.kebab_item}
                                    onClick={() =>
                                      deleteReview(index, review.id)
                                    }
                                  >
                                    삭제
                                  </div>
                                </div>
                              )
                            : showKebab[index] && (
                                <div className={styles.kebab_list}>
                                  <div
                                    className={styles.kebab_item}
                                    onClick={() => handleModalTarget(review.id)}
                                  >
                                    신고
                                  </div>
                                </div>
                              )}
                        </div>
                      </div>
                      <div className={styles.info}>
                        <img
                          src={
                            careerStatus(review.userCareer.last_date) ===
                            '전직자'
                              ? '/src/assets/images/ico_career_f.png'
                              : '/src/assets/images/ico_career_c.png'
                          }
                        />
                        <span>{careerStatus(review.userCareer.last_date)}</span>
                        <span>{review.user.user_id}</span>
                        <span>{review.userCareer.type}</span>
                        <span>
                          {review.created_date.slice(0, 10).replace(/-/g, '.')}
                        </span>
                      </div>
                      {review.blind != 1 ? (
                        <BlindComment type={review.blind}></BlindComment>
                      ) : (
                        <div className={styles.content}>
                          <div className={styles.pros}>
                            <h4>장점</h4>
                            <p>{review.pros}</p>
                          </div>
                          <div className={styles.cons}>
                            <h4>단점</h4>
                            <p>{review.cons}</p>
                          </div>
                          <div className={styles.hashtag}>
                            {Hashtag(review.hashtag).map((item) => (
                              <span
                                style={{
                                  marginRight: '12px',
                                  marginBottom: '8px',
                                  display: 'inline-block',
                                }}
                                key={item}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          <button
                            className={`body2 ${styles.btn_like} ${
                              isLike[review.id] ? styles.on : ''
                            }`}
                            onClick={() => like(review.id)}
                          >
                            {isLike[review.id] ? (
                              <img
                                src="/src/assets/images/like_on.png"
                                alt="좋아요"
                              />
                            ) : (
                              <img
                                src="/src/assets/images/like.png"
                                alt="좋아요"
                              />
                            )}
                            도움이 돼요
                            <span>({review.likes})</span>
                          </button>
                        </div>
                      )}

                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
            {showAll ? null : (
              <button
                type="button"
                className={styles.btn_show}
                onClick={() => handleShowAll()}
              >
                리뷰 전체 보기
                <img
                  src="/src/assets/images/ico_arrow_R.png"
                  style={{ height: '12px', marginLeft: '8px' }}
                />
              </button>
            )}
          </>
        ) : (
          <>
            <div className={styles.review_wrap}>
              <div className={styles.review_item} style={{ color: '#222' }}>
                아직 작성된 리뷰가 없습니다.
              </div>
            </div>
          </>
        )}
      </section>
      <ReportModal
        target={modal.target}
        target_id={modal.target_id}
        modalOpen={modal.isOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default DetailWorking;
