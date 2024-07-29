import React from "react";
import styles from "./View.module.scss";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import btn_share from "@/assets/images/ico_share.png";
import btn_kebab from "@/assets/images/btn_kebab.png";
import ico_facebook from "@/assets/images/ico_facebook.svg";
import ico_kakao from "@/assets/images/ico_kakao.svg";
import ico_X from "@/assets/images/ico_sns_X.png";
import ico_url from "@/assets/images/ico_url.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_dislike from "@/assets/images/ico_dislike.png";
import ico_arrow_down from "@/assets/images/ico_arrow_down_gnb.png";

const ViewPost = () => {
  return (
    <div className={styles.view_wrap}>
      <div className={styles.topic}>
        <h4>
          <span className={styles.gray}>자유게시판</span>
          <span className={styles.gray}>|</span>
          <span>이슈</span>
        </h4>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.post_wrap}>
          <div className={styles.post_header}>
            <h3>제목입니다제목입니다제목입니다제목입니다.</h3>
            <div className={styles.post_header_info}>
              <div className={styles.writer_info}>
                <img src={ico_profile} alt="profile_image" />
                <div>
                  <div className="body2">
                    <span>홍길동</span>
                    <img
                      src={ico_level}
                      alt="레벨"
                      style={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "4px",
                      }}
                    />
                  </div>
                  <div className="caption" style={{ color: "#aaa" }}>
                    <span>30분 전</span>
                    <img
                      src={ico_view}
                      alt="views"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "8px",
                        marginRight: "4px",
                      }}
                    />
                    <span>5,000</span>
                  </div>
                </div>
              </div>
              <div className={styles.options}>
                <div className={styles.share}>
                  <img
                    src={btn_share}
                    alt="share"
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                  <div
                    className={styles.share_list}
                    style={{ display: "none" }}
                  >
                    <div className="body2">
                      <img src={ico_facebook} alt="facebook" />
                      Facebook
                    </div>
                    <div className="body2">
                      <img src={ico_X} alt="X(Twitter)" />
                      X(Twitter)
                    </div>
                    <div className="body2">
                      <img src={ico_kakao} alt="KakaoTalk" />
                      KakaoTalk
                    </div>
                    <div className="body2">
                      <img src={ico_url} alt="Copy URL" />
                      Copy URL
                    </div>
                  </div>
                </div>
                <div className={styles.kebab}>
                  <img
                    src={btn_kebab}
                    alt="kebab"
                    style={{ width: "15px", height: "15px", cursor: "pointer" }}
                  />
                  <div className={styles.kebab_list}>
                    {/* <div>Facebook</div>
                    <div>X(Twitter)</div>
                    <div>KakaoTalk</div>
                    <div>Copy URL</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.post_content}>
            게시글 본문입니다.게시글 본문입니다. 게시글 본문입니다. 게시글
            본문입니다.게시글 본문입니다.게시글 본문입니다.게시글
            본문입니다.게시글 본문입니다.게시글 본문입니다. 게시글
            본문입니다.게시글 본문입니다.게시글 본문입니다. 게시글
            본문입니다.게시글 본문입니다.
          </div>
          <div className={styles.likes}>
            <button>
              <img src={ico_like} alt="좋아요" />
              <span>0</span>
            </button>
            <button>
              <img src={ico_dislike} alt="싫어요" />
              <span>0</span>
            </button>
          </div>
        </div>
        <div className={styles.comment_wrap}>
          <p>댓글 000</p>
          <div className={styles.comment_write}>
            <img src={ico_profile} alt="profile" />
            <input type="textarea" placeholder="댓글을 작성해주세요." />
            <button>등록</button>
          </div>
          <div className={styles.comment_list}>
            <div className={styles.comment_item}>
              <div className={styles.comment_header}>
                <div className={styles.user_info}>
                  <div className={styles.profile}>
                    <img src={ico_profile} alt="profile" />
                  </div>
                  <div>
                    <div>
                      닉네임
                      <img
                        src={ico_level}
                        alt="level"
                        style={{ width: "16px", height: "16px" }}
                      />
                    </div>
                    <div style={{ color: "#aaa" }}>30분 전</div>
                  </div>
                </div>
                <div className={styles.kebab}>
                  <img
                    src={btn_kebab}
                    alt="kebab"
                    style={{ width: "15px", height: "15px", cursor: "pointer" }}
                  />
                  <div className={styles.kebab_list}>
                    {/* <div>Facebook</div>
                    <div>X(Twitter)</div>
                    <div>KakaoTalk</div>
                    <div>Copy URL</div> */}
                  </div>
                </div>
              </div>
              <div className={styles.comment_body}>
                <div className={styles.comment_content}>
                  감동적인 장면이 많아서 마음이 따뜻해져요ㅎㅎ 전개가 빠르고
                  흥미진진해서 눈을 뗄 수가 없어요! 스토리가 독특하고 신선해요.
                  계속 보게 됨ㅋㅋㅋㅋ 초반엔 좀 지루했는데 중반부터 완전
                  빠져들었어요ㅋㅋ 감동적인 장면이 많아서 마음이 따뜻해져요ㅎㅎ
                  현실적인 내용이라 공감 많이 됨ㅎㅎ
                </div>
                <div className={styles.likes}>
                  <button>
                    <img src={ico_like} alt="좋아요" />
                    <span>0</span>
                  </button>
                  <button>
                    <img src={ico_dislike} alt="싫어요" />
                    <span>0</span>
                  </button>
                  <button>댓글달기</button>
                </div>
                <div className={styles.child_wrap}>
                  <button>
                    <img
                      src={ico_arrow_down}
                      alt="arrow"
                      style={{
                        width: "16px",
                        height: "8px",
                        marginRight: "8px",
                        transform: "rotate(180deg)",
                      }}
                    />
                    댓글 0개
                  </button>
                  <div className={styles.child_list}>
                    <div className={styles.child_item}>
                      <div className={styles.child_header}>
                        <div className={styles.user_info}>
                          <div className={styles.profile}>
                            <img src={ico_profile} alt="profile" />
                          </div>
                          <div>
                            <div>
                              닉네임
                              <img
                                src={ico_level}
                                alt="level"
                                style={{ width: "16px", height: "16px" }}
                              />
                            </div>
                            <div style={{ color: "#aaa" }}>30분 전</div>
                          </div>
                        </div>
                        <div className={styles.kebab}>
                          <img
                            src={btn_kebab}
                            alt="kebab"
                            style={{
                              width: "15px",
                              height: "15px",
                              cursor: "pointer",
                            }}
                          />
                          <div className={styles.kebab_list}>
                            {/* <div>Facebook</div>
                    <div>X(Twitter)</div>
                    <div>KakaoTalk</div>
                    <div>Copy URL</div> */}
                          </div>
                        </div>
                      </div>
                      <div className={styles.child_body}>
                        <div className={styles.child_content}>
                          감동적인 장면이 많아서 마음이 따뜻해져요ㅎㅎ 전개가
                          빠르고 흥미진진해서 눈을 뗄 수가 없어요! 스토리가
                          독특하고 신선해요. 계속 보게 됨ㅋㅋㅋㅋ 초반엔 좀
                          지루했는데 중반부터 완전 빠져들었어요ㅋㅋ 감동적인
                          장면이 많아서 마음이 따뜻해져요ㅎㅎ 현실적인 내용이라
                          공감 많이 됨ㅎㅎ
                        </div>
                        <div className={styles.likes}>
                          <button>
                            <img src={ico_like} alt="좋아요" />
                            <span>0</span>
                          </button>
                          <button>
                            <img src={ico_dislike} alt="싫어요" />
                            <span>0</span>
                          </button>
                          <button>댓글달기</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>페이지네이션</div>
    </div>
  );
};

export default ViewPost;
