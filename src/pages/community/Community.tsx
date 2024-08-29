import React from "react";
import styles from "./Community.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "@/components/SliderArrow";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_arrow_right from "@/assets/images/ico_arrow_R1.png";

const Community = () => {
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1489, // 1024px 이상일 때 (더 큰 화면 예시)
        settings: {
          slidesToShow: 3, // 슬라이드 갯수를 4개로 변경
        },
      },
      {
        breakpoint: 1023, // 1024px 이상일 때 (더 큰 화면 예시)
        settings: {
          slidesToShow: 2, // 슬라이드 갯수를 4개로 변경
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.banner} style={{ backgroundColor: "#aaa" }}>
        배너
      </div>
      <div className={styles.weekly_wrap}>
        <h4>Weekly Best</h4>
        <div className={`slider-container ${styles.content_list}`}>
          <Slider {...sliderSettings}>
            <div className={styles.content}>
              <div className={styles.info}>
                <img src={ico_profile} alt="profile_image" />
                <span className={`body2`}>
                  닉네임임닉네임임
                  <img
                    src={ico_level}
                    alt="레벨"
                    style={{ width: "18px", marginLeft: "4px" }}
                  />
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
                  5,000
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_like}
                    alt="like"
                    style={{ width: "16px", marginRight: "4px" }}
                  />
                  10
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_reply}
                    alt="reply"
                    style={{ width: "20px", marginRight: "4px" }}
                  />
                  2
                </span>
              </div>
              <h5>글제목입니다 이영역은 글제목</h5>
              <div className={styles.content_body}>
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.info}>
                <img src={ico_profile} alt="profile_image" />
                <span className={`body2`}>
                  닉네임임닉네임임
                  <img
                    src={ico_level}
                    alt="레벨"
                    style={{ width: "18px", marginLeft: "4px" }}
                  />
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
                  5,000
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_like}
                    alt="like"
                    style={{ width: "16px", marginRight: "4px" }}
                  />
                  10
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_reply}
                    alt="reply"
                    style={{ width: "20px", marginRight: "4px" }}
                  />
                  2
                </span>
              </div>
              <h5>222글제목입니다 이영역은 글제목</h5>
              <div className={styles.content_body}>
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.info}>
                <img src={ico_profile} alt="profile_image" />
                <span className={`body2`}>
                  닉네임임닉네임임
                  <img
                    src={ico_level}
                    alt="레벨"
                    style={{ width: "18px", marginLeft: "4px" }}
                  />
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
                  5,000
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_like}
                    alt="like"
                    style={{ width: "16px", marginRight: "4px" }}
                  />
                  10
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_reply}
                    alt="reply"
                    style={{ width: "20px", marginRight: "4px" }}
                  />
                  2
                </span>
              </div>
              <h5>333글제목입니다 이영역은 글제목</h5>
              <div className={styles.content_body}>
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.info}>
                <img src={ico_profile} alt="profile_image" />
                <span className={`body2`}>
                  닉네임임닉네임임
                  <img
                    src={ico_level}
                    alt="레벨"
                    style={{ width: "18px", marginLeft: "4px" }}
                  />
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
                  5,000
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_like}
                    alt="like"
                    style={{ width: "16px", marginRight: "4px" }}
                  />
                  10
                </span>
                <span className={`body2`} style={{ color: "#aaa" }}>
                  <img
                    src={ico_reply}
                    alt="reply"
                    style={{ width: "20px", marginRight: "4px" }}
                  />
                  2
                </span>
              </div>
              <h5>444글제목입니다 이영역은 글제목</h5>
              <div className={styles.content_body}>
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.free_wrap}>
          <div className={styles.header}>
            <h4>자유게시판</h4>
            <div className="body2" style={{ color: "#aaa", cursor: "pointer" }}>
              더보기 &gt;
            </div>
          </div>
          <ul className={styles.content_list}>
            <li className={styles.content_item}>
              <div className={styles.info}>
                <div>
                  <img src={ico_profile} alt="profile_image" />
                  <span className={`body2`}>
                    닉네임임닉네임임
                    <img
                      src={ico_level}
                      alt="레벨"
                      style={{ width: "18px", marginLeft: "4px" }}
                    />
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
                    5,000
                  </span>
                </div>
                <div>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_like}
                      alt="like"
                      style={{ width: "16px", marginRight: "4px" }}
                    />
                    10
                  </span>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_reply}
                      alt="reply"
                      style={{ width: "20px", marginRight: "4px" }}
                    />
                    2
                  </span>
                </div>
              </div>
              <h5 className={styles.title}>
                제목제목제목제목제목제목제목제목제목 제목 제목 제목 제목
                제목제목
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Community;
