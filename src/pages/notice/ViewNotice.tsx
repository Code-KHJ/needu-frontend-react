import noticeApi from "@/apis/notice";
import ico_dislike from "@/assets/images/ico_dislike.png";
import ico_dislike_on from "@/assets/images/ico_dislike_on.png";
import ico_facebook from "@/assets/images/ico_facebook.svg";
import ico_kakao from "@/assets/images/ico_kakao.svg";
import ico_like from "@/assets/images/ico_like.png";
import btn_share from "@/assets/images/ico_share.png";
import ico_X from "@/assets/images/ico_sns_X.png";
import ico_url from "@/assets/images/ico_url.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_like_on from "@/assets/images/like_on.png";
import Comments from "@/components/comments/Comments";
import KebabNotice from "@/components/KebabNotice";
import ProfileImage from "@/components/ProfileImage";
import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { LikeNoticeDto, NoticeContent } from "@/interface/Notice";
import agoDate from "@/utils/agoDate";
import userLevel from "@/utils/calculateUserLevel";
import { dompurify } from "@/utils/dompurify";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Helmets from "../helmets";
import styles from "./View.module.scss";

const ViewNotice = () => {
  const { showLoading, hideLoading } = useLoading();
  const previousPage = useLocation().state?.previous;
  const pathname = useLocation().pathname.split("/");
  const noticeId = parseFloat(pathname[pathname.length - 1]);
  //@ts-ignore
  const { user } = useUser();
  const navigate = useNavigate();

  const [notice, setNotice] = useState<NoticeContent>();
  const [likes, setLikes] = useState({
    like: 0,
    dislike: 0,
  });

  useEffect(() => {
    if (!noticeId) {
      navigate("/404");
      return;
    }
    showLoading();
    const getNotice = async (noticeId: number) => {
      const response: any = await noticeApi.getNotice(noticeId);
      if (response.status !== 200) {
        if (response.status === 404) {
          hideLoading();
          navigate("/404", {
            state: { previous: previousPage },
          });
          return;
        }
        hideLoading();
        navigate("/error", {
          state: { previous: previousPage },
        });
        return;
      }
      if (response.data.msg === "is_del") {
        hideLoading();
        navigate("/404", {
          state: { previous: previousPage },
        });
        return;
      }
      setNotice(response.data);
      setLikes({
        like: response.data.noticeLikes?.filter((item: any) => item.type === 1)
          .length,
        dislike: response.data.noticeLikes?.filter(
          (item: any) => item.type === -1
        ).length,
      });
      setIsLike({
        like: response.data.noticeLikes?.some(
          (item: any) => item.user_id === user.id && item.type === 1
        ),
        dislike: response.data.noticeLikes?.some(
          (item: any) => item.user_id === user.id && item.type === -1
        ),
      });
      updateView(noticeId);
    };
    const updateView = async (noticeId: number) => {
      const response: any = await noticeApi.updateView(noticeId);
      if (response.status !== 200) {
        if (response.status === 404) {
          hideLoading();
          navigate("/404", {
            state: { previous: previousPage },
          });
        }
        hideLoading();
        navigate("/error", {
          state: { previous: previousPage },
        });
      }
    };
    getNotice(noticeId);
    hideLoading();
  }, [noticeId]);

  const [isLike, setIsLike] = useState({
    like: false,
    dislike: false,
  });
  let isProcessingLike = false;
  const likeNotice = async (type: string) => {
    if (isProcessingLike) return alert("이전 요청을 처리중입니다.");
    isProcessingLike = true;

    try {
      if (!user || user.id === null) {
        alert("로그인 후 이용이 가능합니다.");
        return;
      }
      if (type === "like" && isLike.dislike) {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      if (type === "dislike" && isLike.like) {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      const likeDto: LikeNoticeDto = {
        notice_id: noticeId,
        user_id: user.id,
        type: type,
      };
      const response: any = await noticeApi.updateNoticeLike(likeDto);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      if (response.data.msg === "타입오류") {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      if (likeDto.type === "like") {
        setLikes({
          ...likes,
          like:
            response.data.msg === "좋아요" ? likes.like + 1 : likes.like - 1,
        });
        setIsLike({
          ...isLike,
          like: response.data.msg === "좋아요" ? true : false,
        });
        return;
      }
      if (likeDto.type === "dislike") {
        setLikes({
          ...likes,
          dislike:
            response.data.msg === "싫어요"
              ? likes.dislike + 1
              : likes.dislike - 1,
        });
        setIsLike({
          ...isLike,
          dislike: response.data.msg === "싫어요" ? true : false,
        });
        return;
      }
    } catch (error) {
      alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      isProcessingLike = false;
    }
  };

  const [showShare, setShowShare] = useState(false);
  const handleShare = () => {
    setShowShare(!showShare);
  };

  const shareRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareRef]);

  return (
    <>
      <Helmets
        title={"공지사항 I 사회복지 커뮤니티 NEEDU"}
        description="전혁직 기관 리뷰, 실습니뷰,  니쥬챗, 커뮤니티까지 사회복지에 대한 모든 이야기를 나누며 더 발전해보세요"
      ></Helmets>
      <div className={styles.view_wrap}>
        <div className={styles.topic}>
          <h4>
            <span className={styles.gray}>공지사항</span>
            <span className={styles.gray}>|</span>
            <span>공지사항</span>
          </h4>
        </div>
        <div className={styles.content_wrap}>
          <div className={styles.post_wrap}>
            <div className={styles.post_header}>
              <h3>{notice?.title}</h3>
              <div className={styles.post_header_info}>
                <div className={styles.writer_info}>
                  <ProfileImage src={notice?.writer.profile_image} />
                  <div>
                    <div>
                      <span>{notice?.writer.nickname}</span>
                      <img
                        src={
                          userLevel((notice as any)?.writer.activity_points)
                            ?.icon
                        }
                        alt="레벨"
                        style={{
                          width: "16px",
                          height: "16px",
                          marginLeft: "4px",
                        }}
                      />
                    </div>
                    <div className="body2" style={{ color: "#aaa" }}>
                      <span>{agoDate(notice?.created_at as Date)}</span>
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
                      <span>{notice?.view}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.options}>
                  <div className={styles.share} ref={shareRef}>
                    <img
                      src={btn_share}
                      alt="share"
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleShare()}
                    />
                    <div
                      className={styles.share_list}
                      style={showShare ? {} : { display: "none" }}
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
                  <KebabNotice target_id={notice?.id as number}></KebabNotice>
                </div>
              </div>
            </div>
            <div
              className={`post_content ${styles.post_content}`}
              dangerouslySetInnerHTML={{
                __html: dompurify(notice?.content as string),
              }}
            ></div>
            <div className={styles.likes}>
              <button
                className={isLike.like ? styles.like_on : ""}
                onClick={() => likeNotice("like")}
              >
                <img src={isLike.like ? ico_like_on : ico_like} alt="좋아요" />
                <span className="body2">{likes.like}</span>
              </button>
              <button
                className={isLike.dislike ? styles.dislike_on : ""}
                onClick={() => likeNotice("dislike")}
              >
                <img
                  src={isLike.dislike ? ico_dislike_on : ico_dislike}
                  alt="싫어요"
                />
                <span className="body2">{likes.dislike}</span>
              </button>
            </div>
          </div>
          <Comments
            postId={notice?.id as number}
            type="notice"
            accepted_id={null}
            isWriter={false}
          />
        </div>
      </div>
    </>
  );
};

export default ViewNotice;
