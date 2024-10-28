import styles from "./Home.module.scss";
import ico_view from "@/assets/images/ico_view.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_arrow from "@/assets/images/ico_arrow_down.png";

const Home = () => {
  return (
    <div className={styles.home_wrap}>
      <div>배너</div>
      <div className={styles.content_wrap}>
        <div className={styles.community_wrap}>
          <div className={styles.header}>
            <h3>커뮤니티</h3>
            <div className={styles.tab}>
              <button className={styles.current_tab}>
                <h5>최신</h5>
              </button>
              <button>
                <h5>자유게시판</h5>
              </button>
              <button>
                <h5>질문&답변</h5>
              </button>
            </div>
          </div>
          <div className={styles.body_wrap}>
            <ul>
              <li className={styles.item}>
                <h5 className={styles.type}>태그</h5>
                <div className={styles.content}>
                  <div className={styles.title}>
                    제목은 30자를 최대로 합니다. 여기는 제목 영역제목은 30자를
                    최대로 합니다. 여기는 제목 영역
                  </div>
                  <div className={styles.reaction}>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px" }}
                      />
                      20
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_reply}
                        alt="reply"
                        style={{ width: "20px" }}
                      />
                      1
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_view}
                        alt="reply"
                        style={{ width: "20px" }}
                      />
                      111
                    </span>
                  </div>
                </div>
              </li>
              <li className={styles.item}>
                <h5 className={styles.type}>태그</h5>
                <div className={styles.content}>
                  <div className={styles.title}>제목은</div>
                  <div className={styles.reaction}>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px" }}
                      />
                      20
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_reply}
                        alt="reply"
                        style={{ width: "20px" }}
                      />
                      1
                    </span>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_view}
                        alt="reply"
                        style={{ width: "20px" }}
                      />
                      111
                    </span>
                  </div>
                </div>
              </li>
            </ul>
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
        <div className={styles.review_wrap}>
          <div className={styles.header}>
            <h3>리뷰</h3>
            <div className={styles.tab}>
              <button className={styles.current_tab}>
                <h5>최신</h5>
              </button>
              <button>
                <h5>전현직</h5>
              </button>
              <button>
                <h5>실습</h5>
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
