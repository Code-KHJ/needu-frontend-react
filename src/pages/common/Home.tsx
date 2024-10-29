import communityApi from "@/apis/community";
import corpApi from "@/apis/corp";
import reviewApi from "@/apis/review";
import ico_arrow from "@/assets/images/ico_arrow_down.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_triangle from "@/assets/images/ico_triangle_blue.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_score from "@/assets/images/Star_1.png";
import ProfileImage from "@/components/ProfileImage";
import { NextArrow, PrevArrow } from "@/components/SliderArrow";
import { useLoading } from "@/contexts/LoadingContext";
import { PostListItemContent } from "@/interface/Community";
import { CommonReviewContent } from "@/interface/Review";
import agoDate from "@/utils/agoDate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./Home.module.scss";

interface PostList {
  working: CommonReviewContent[];
  training: CommonReviewContent[];
  free: PostListItemContent[];
  question: PostListItemContent[];
  corp: { corpname: string; description: string }[];
}

const Home = () => {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const winInnerWidth = window.innerWidth;
  const [postList, setPostList] = useState<PostList>({
    working: [],
    training: [],
    free: [],
    question: [],
    corp: [],
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
    const getWorking = async () => {
      const response: any = await reviewApi.getWorkingReviewByRecent();
      if (response.status !== 200) {
        hideLoading();
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setPostList((prev) => ({
        ...prev,
        working: response.data,
      }));
    };
    const getTraining = async () => {
      const response: any = await reviewApi.getTrainingReviewByRecent();
      if (response.status !== 200) {
        hideLoading();
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setPostList((prev) => ({
        ...prev,
        training: response.data,
      }));
    };
    const getHotCorp = async () => {
      const response: any = await corpApi.getHotList();
      if (response.status !== 200) {
        hideLoading();
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      setPostList((prev) => ({
        ...prev,
        corp: response.data,
      }));
    };
    getFreeList();
    getQuestionList();
    getWorking();
    getTraining();
    getHotCorp();
    hideLoading();
  }, []);

  const [sliceCount, setSliceCount] = useState(winInnerWidth < 768 ? 3 : 6);
  const handleResize = () => {
    const winResize = window.innerWidth;
    if (winResize < 768) {
      setSliceCount(3);
      setCorpSliderSettings((prev) => ({
        ...prev,
        slidesToShow: 3,
      }));
      setBannerSliderSettings((prev) => ({
        ...prev,
        centerMode: false,
      }));
    } else if (winResize >= 768 && winResize < 1280) {
      setSliceCount(6);
      setCorpSliderSettings((prev) => ({
        ...prev,
        slidesToShow: 6,
      }));
      setBannerSliderSettings((prev) => ({
        ...prev,
        centerMode: false,
      }));
    } else if (winResize >= 1280) {
      setCorpSliderSettings((prev) => ({
        ...prev,
        slidesToShow: 3,
      }));
      setBannerSliderSettings((prev) => ({
        ...prev,
        centerMode: true,
      }));
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [bannerSliderSettings, setBannerSliderSettings] = useState({
    focusOnSelect: true,
    centerMode: winInnerWidth < 768 ? false : true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  });
  const [corpSliderSettings, setCorpSliderSettings] = useState({
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: winInnerWidth >= 768 && winInnerWidth < 1280 ? 6 : 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  });

  return (
    <div className={styles.home_wrap}>
      <div className={styles.banner_wrap}>
        <Slider {...bannerSliderSettings}>
          <div className={styles.banner}>배너1</div>
          <div className={styles.banner}>배너2</div>
          <div className={styles.banner}>배너3</div>
        </Slider>
      </div>
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
                .slice(0, sliceCount)
                .map((post, index) => (
                  <li className={styles.item} key={index}>
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
          <div className={styles.reviews}>
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
                <button
                  className={styles.btn_more}
                  type="button"
                  onClick={() =>
                    navigate(
                      `${
                        currentTab.review === "training"
                          ? "/review/search/training"
                          : "/review/search/working"
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
                {currentData.review
                  .sort(
                    (a, b) =>
                      new Date(b.created_date).getTime() -
                      new Date(a.created_date).getTime()
                  )
                  .slice(0, sliceCount)
                  .map((review, index) => (
                    <li className={styles.item} key={index}>
                      <h5 className={styles.type}>{review.type}</h5>
                      <div
                        className={styles.content}
                        onClick={() =>
                          navigate(
                            `${
                              review.type === "전현직"
                                ? `/review/detail/working?name=${review.corpname}`
                                : `/review/detail/training?name=${review.corpname}`
                            }`
                          )
                        }
                      >
                        <h5 className={styles.highlight}>{review.highlight}</h5>
                        <div className={styles.info}>
                          <span className={styles.corp_name}>
                            {review.corpname}
                          </span>
                          <span className={styles.score}>
                            <img
                              src={ico_score}
                              alt="score"
                              style={{ width: "18px" }}
                            />
                            {review.total_score}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={styles.hot_corp_wrap}>
            <div className={styles.header}>
              <h3>지금 떠오르는 기관</h3>
              <img src={ico_triangle} alt="icon" style={{ width: "24px" }} />
            </div>
            <ul>
              <Slider {...corpSliderSettings} className={styles.slider_corp}>
                {postList.corp.map((corp, index) => (
                  <li className={styles.item} key={index}>
                    <h5
                      onClick={() =>
                        navigate(
                          `${`/review/detail/working?name=${corp.corpname}`}`
                        )
                      }
                    >
                      {corp.corpname}
                    </h5>
                    <div className={styles.description}>{corp.description}</div>
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom_banner}>하단배너</div>
    </div>
  );
};

export default Home;
